import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createProduct, getAdminProduct, updateProduct } from "../../api/products";
import { getCategories } from "../../api/categories";
import { uploadProductImages } from "../../api/uploads";
import PageHeader from "../../components/common/PageHeader";

const defaults = { name: "", description: "", category: "", subcategory: "", brand: "", price: "", compareAtPrice: "", sku: "", stock: 0, lowStockThreshold: 5, featured: false, bestseller: false, isNew: false, active: true };
const blankVariant = () => ({ sku: "", price: "", compareAtPrice: "", stock: 0, active: true, attributes: [{ key: "", value: "" }] });
const blankSpec = () => ({ key: "", value: "" });
const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxImageSize = 5 * 1024 * 1024;

const Preview = ({ url, index, onRemove }) => {
  const [broken, setBroken] = useState(false);
  return <div className="relative">{broken ? <div className="flex aspect-square items-center justify-center rounded-xl bg-base-200 p-2 text-center text-xs">Image unavailable</div> : <img src={url} onError={() => setBroken(true)} alt={`Product preview ${index + 1}`} className="aspect-square w-full rounded-xl object-cover" loading="lazy" />}<button type="button" className="btn btn-circle btn-error btn-xs absolute -right-2 -top-2" aria-label={`Remove image ${index + 1}`} onClick={onRemove}>×</button>{index === 0 && <span className="badge badge-primary absolute bottom-2 left-2">Primary</span>}</div>;
};

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const [categories, setCategories] = useState([]);
  const [variants, setVariants] = useState([]);
  const [specs, setSpecs] = useState([blankSpec()]);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(Boolean(id));
  const { register, handleSubmit, reset, watch, formState: { isSubmitting } } = useForm({ defaultValues: defaults });
  const category = watch("category");
  const subcategories = useMemo(() => categories.find((item) => item.name === category)?.subcategories || [], [categories, category]);

  useEffect(() => {
    Promise.all([getCategories(), id ? getAdminProduct(id) : null]).then(([categoryData, product]) => {
      setCategories(categoryData.categories);
      if (product) {
        reset({ ...product, compareAtPrice: product.compareAtPrice ?? "" });
        setImages(product.images || []);
        const productSpecs = Object.entries(product.specifications || {}).map(([key, value]) => ({ key, value }));
        setSpecs(productSpecs.length ? productSpecs : [blankSpec()]);
        setVariants((product.variants || []).map((variant) => ({ ...variant, compareAtPrice: variant.compareAtPrice ?? "", attributes: Object.entries(variant.attributes || {}).map(([key, value]) => ({ key, value })) })));
      }
    }).catch((error) => toast.error(error.response?.data?.message || "Product could not be loaded")).finally(() => setLoading(false));
  }, [id, reset]);

  const selectImages = async (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length) return;
    if (files.length > 6) return toast.error("Upload no more than 6 images at once");
    if (files.some((file) => !acceptedTypes.has(file.type))) return toast.error("Choose JPEG, PNG, or WebP images only");
    if (files.some((file) => file.size > maxImageSize)) return toast.error("Each image must be 5 MB or smaller");
    setUploading(true);
    try {
      const urls = await uploadProductImages(files);
      setImages((current) => [...current, ...urls]);
      toast.success(`${urls.length} image${urls.length === 1 ? "" : "s"} uploaded`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Images could not be uploaded");
    } finally {
      setUploading(false);
    }
  };

  const changeVariant = (index, field, value) => setVariants((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item));
  const submit = async (values) => {
    if (uploading) return toast.error("Wait for image uploads to finish");
    const populated = specs.filter((spec) => spec.key.trim() || spec.value.trim());
    const keys = populated.map((spec) => spec.key.trim().toLowerCase());
    if (populated.some((spec) => !spec.key.trim() || !spec.value.trim())) return toast.error("Complete both fields for each specification");
    if (new Set(keys).size !== keys.length) return toast.error("Specification names must be unique");
    try {
      const payload = { ...values, price: Number(values.price), compareAtPrice: values.compareAtPrice === "" ? null : Number(values.compareAtPrice), stock: Number(values.stock), lowStockThreshold: Number(values.lowStockThreshold), images, specifications: Object.fromEntries(populated.map((spec) => [spec.key.trim(), spec.value.trim()])), variants: variants.map((variant) => ({ sku: variant.sku.trim(), price: Number(variant.price), compareAtPrice: variant.compareAtPrice === "" ? null : Number(variant.compareAtPrice), stock: Number(variant.stock), active: variant.active, attributes: Object.fromEntries(variant.attributes.filter((attribute) => attribute.key.trim() && attribute.value.trim()).map((attribute) => [attribute.key.trim(), attribute.value.trim()])) })) };
      id ? await updateProduct(id, payload) : await createProduct(payload);
      toast.success("Product saved");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.response?.data?.errors?.join(", ") || error.response?.data?.message || "Product could not be saved");
    }
  };

  const input = "input input-bordered w-full";
  if (loading) return <span className="loading loading-spinner loading-lg text-primary" />;
  return <section><PageHeader title={`${id ? "Edit" : "Add"} Product`} description="Manage catalog details, inventory and merchandising." backTo="/admin/products" backLabel="Back to Products" /><form onSubmit={handleSubmit(submit)} className="mt-8 space-y-7 rounded-3xl bg-white p-6 sm:p-8"><div className="grid gap-4 md:grid-cols-2"><label>Name<input className={input} {...register("name", { required: true, maxLength: 160 })} /></label><label>Brand<input className={input} {...register("brand", { maxLength: 100 })} /></label><label className="md:col-span-2">Description<textarea className="textarea textarea-bordered min-h-28 w-full" {...register("description", { required: true, maxLength: 5000 })} /></label><label>Category<select className="select select-bordered w-full" {...register("category", { required: true })}><option value="">Select</option>{categories.map((item) => <option key={item._id}>{item.name}</option>)}</select></label><label>Subcategory<select className="select select-bordered w-full" {...register("subcategory")}><option value="">None</option>{subcategories.map((item) => <option key={item.slug} value={item.name}>{item.name}</option>)}</select></label>{[["Price", "price"], ["Compare At Price", "compareAtPrice"], ["SKU", "sku"], ["Stock", "stock"], ["Low Stock Threshold", "lowStockThreshold"]].map(([label, name]) => <label key={name}>{label}<input type={name === "sku" ? "text" : "number"} min={name === "sku" ? undefined : 0} className={input} {...register(name, { required: ["price", "sku", "stock"].includes(name) })} /></label>)}<div className="md:col-span-2"><span className="block">Product Images</span><input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={selectImages} disabled={uploading} /><button type="button" className="btn btn-outline btn-primary mt-2" onClick={() => fileInput.current?.click()} disabled={uploading}>{uploading ? <><span className="loading loading-spinner loading-sm" /> Uploading…</> : "Choose Images"}</button><p className="mt-2 text-sm text-base-content/60">JPEG, PNG, or WebP. Up to 5 MB each; select up to 6 at once.</p></div>{images.length > 0 && <div className="grid grid-cols-3 gap-3 md:col-span-2 sm:grid-cols-5">{images.map((url, index) => <Preview key={`${url}-${index}`} url={url} index={index} onRemove={() => setImages((items) => items.filter((_, itemIndex) => itemIndex !== index))} />)}</div>}</div>
      <section><div className="flex items-center justify-between"><h2 className="heading text-2xl">Specifications</h2><button type="button" className="btn btn-sm" onClick={() => setSpecs((items) => [...items, blankSpec()])}>Add Specification</button></div><div className="mt-4 space-y-3">{specs.map((spec, index) => <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]"><input value={spec.key} onChange={(event) => setSpecs((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, key: event.target.value } : item))} className={input} placeholder="Specification Name" /><input value={spec.value} onChange={(event) => setSpecs((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, value: event.target.value } : item))} className={input} placeholder="Specification Value" /><button type="button" className="btn btn-error btn-outline" onClick={() => setSpecs((items) => items.filter((_, itemIndex) => itemIndex !== index))}>Remove</button></div>)}</div></section>
      <section><div className="flex items-center justify-between"><h2 className="heading text-2xl">Variants</h2><button type="button" className="btn btn-sm" onClick={() => setVariants((items) => [...items, blankVariant()])}>Add Variant</button></div>{variants.map((variant, index) => <div key={index} className="mt-4 rounded-2xl bg-base-200 p-5"><div className="grid gap-3 md:grid-cols-4"><input value={variant.sku} onChange={(event) => changeVariant(index, "sku", event.target.value)} className={input} placeholder="SKU" /><input type="number" value={variant.price} onChange={(event) => changeVariant(index, "price", event.target.value)} className={input} placeholder="Price" /><input type="number" value={variant.compareAtPrice} onChange={(event) => changeVariant(index, "compareAtPrice", event.target.value)} className={input} placeholder="Compare price" /><input type="number" value={variant.stock} onChange={(event) => changeVariant(index, "stock", event.target.value)} className={input} placeholder="Stock" /></div>{variant.attributes.map((attribute, attributeIndex) => <div key={attributeIndex} className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto]"><input value={attribute.key} onChange={(event) => changeVariant(index, "attributes", variant.attributes.map((item, itemIndex) => itemIndex === attributeIndex ? { ...item, key: event.target.value } : item))} className={input} placeholder="Attribute (Shade)" /><input value={attribute.value} onChange={(event) => changeVariant(index, "attributes", variant.attributes.map((item, itemIndex) => itemIndex === attributeIndex ? { ...item, value: event.target.value } : item))} className={input} placeholder="Value" /><button type="button" className="btn" onClick={() => changeVariant(index, "attributes", variant.attributes.filter((_, itemIndex) => itemIndex !== attributeIndex))}>Remove</button></div>)}<div className="mt-3 flex flex-wrap gap-3"><button type="button" className="btn btn-xs" onClick={() => changeVariant(index, "attributes", [...variant.attributes, { key: "", value: "" }])}>Add Attribute</button><button type="button" className="btn btn-xs btn-error" onClick={() => setVariants((items) => items.filter((_, itemIndex) => itemIndex !== index))}>Remove Variant</button><label><input type="checkbox" checked={variant.active} onChange={(event) => changeVariant(index, "active", event.target.checked)} /> Active</label></div></div>)}</section>
      <div className="flex flex-wrap gap-5">{[["featured", "Featured"], ["bestseller", "Bestseller"], ["isNew", "New"], ["active", "Active"]].map(([name, label]) => <label key={name}><input type="checkbox" className="checkbox checkbox-primary" {...register(name)} /> {label}</label>)}</div><button disabled={isSubmitting || uploading} className="btn btn-primary rounded-full">{isSubmitting ? "Saving…" : uploading ? "Uploading…" : "Save Product"}</button></form></section>;
};

export default ProductForm;
