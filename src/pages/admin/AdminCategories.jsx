import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  createCategory,
  deleteCategory,
  getAdminCategories,
  updateCategory,
} from "../../api/categories";

const defaultValues = { name: "", subcategories: "", active: true };

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  const loadCategories = useCallback(async () => {
    const data = await getAdminCategories();
    setCategories(data.categories);
  }, []);

  useEffect(() => {
    getAdminCategories()
      .then((data) => setCategories(data.categories))
      .catch(() => toast.error("Unable to load categories"));
  }, []);

  const onSubmit = async (values) => {
    try {
      const payload = {
        name: values.name,
        subcategories: values.subcategories
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        active: values.active,
      };
      if (editing) await updateCategory(editing, payload);
      else await createCategory(payload);
      setEditing(null);
      reset(defaultValues);
      await loadCategories();
      toast.success("Category saved");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to save category");
    }
  };

  const startEditing = (category) => {
    setEditing(category._id);
    reset({
      name: category.name,
      subcategories: category.subcategories.join(", "),
      active: category.active,
    });
  };

  const removeCategory = async (id) => {
    if (!window.confirm("Delete this category? Existing products are not changed.")) return;
    try {
      await deleteCategory(id);
      await loadCategories();
      toast.success("Category deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete category");
    }
  };

  return (
    <section>
      <p className="uppercase tracking-[4px] text-primary">Catalog structure</p>
      <h1 className="heading mt-2 text-5xl">Categories</h1>
      <div className="mt-8 grid gap-8 xl:grid-cols-[380px_1fr]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-3xl bg-white p-7">
          <label>Name<input className="input input-bordered w-full" {...register("name", { required: true })} /></label>
          <label>Subcategories, comma separated<textarea className="textarea textarea-bordered w-full" {...register("subcategories")} /></label>
          <label className="flex gap-2"><input type="checkbox" className="checkbox checkbox-primary" {...register("active")} />Active</label>
          <button className="btn btn-primary rounded-full">{editing ? "Update" : "Add"} Category</button>
          {editing && <button type="button" onClick={() => { setEditing(null); reset(defaultValues); }} className="btn btn-ghost">Cancel</button>}
        </form>
        <div className="space-y-4">
          {categories.map((category) => (
            <article key={category._id} className="rounded-3xl bg-white p-6">
              <div className="flex justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3"><h2 className="heading text-2xl">{category.name}</h2><span className={`badge ${category.active ? "badge-success" : "badge-ghost"}`}>{category.active ? "Active" : "Inactive"}</span></div>
                  <p className="mt-2 text-sm text-neutral/60">{category.subcategories.join(" · ") || "No subcategories"}</p>
                </div>
                <div className="flex gap-2"><button onClick={() => startEditing(category)} className="btn btn-sm">Edit</button><button onClick={() => removeCategory(category._id)} className="btn btn-sm btn-outline btn-error">Delete</button></div>
              </div>
            </article>
          ))}
          {!categories.length && <p className="rounded-3xl bg-white p-10 text-center text-neutral/60">No categories yet.</p>}
        </div>
      </div>
    </section>
  );
};

export default AdminCategories;
