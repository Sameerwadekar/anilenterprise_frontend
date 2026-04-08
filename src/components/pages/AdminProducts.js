import { useState, useEffect } from "react";
import CustomSwal, { useSwal } from "../utils/CustomSwal";
import Loader from "../utils/proxy/Loader";
// import {
//   getAllProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from "../../utils/proxy/productProxy";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const PackageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

const LiterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2h8"/>
    <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"/>
  </svg>
);

const PriceIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const DepositIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="16"/>
    <line x1="10" y1="14" x2="14" y2="14"/>
  </svg>
);

// ─── Dummy fallback data ───────────────────────────────────────────────────────

const DUMMY_PRODUCTS = [
  { id: "p1", name: "20L Aqua Jar",   brand: "AquaPure",  liter: 20, price: 80,  depositAmount: 200 },
  { id: "p2", name: "10L Mini Jar",   brand: "AquaPure",  liter: 10, price: 50,  depositAmount: 120 },
  { id: "p3", name: "5L Bottle Pack", brand: "ClearDrop", liter: 5,  price: 30,  depositAmount: 80  },
  { id: "p4", name: "25L Office Jar", brand: "HydroMax",  liter: 25, price: 110, depositAmount: 300 },
];

// ─── Product image with fallback ─────────────────────────────────────────────

function ProductImage({ id }) {
  const [err, setErr] = useState(false);
  if (err) return (
    <div className="w-full h-full flex items-center justify-center text-blue-300 bg-blue-50">
      <ImageIcon />
    </div>
  );
  return (
    <img
      src={`http://localhost:8080/product/${id}/image`}
      alt="product"
      className="w-full h-full object-contain p-1.5"
      onError={() => setErr(true)}
    />
  );
}

// ─── Form field ───────────────────────────────────────────────────────────────

function FormField({ icon: Icon, label, error, ...props }) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
          <Icon />
        </span>
        <input
          {...props}
          className={`w-full pl-10 pr-4 py-2.5 bg-blue-50/40 border rounded-xl text-sm text-gray-800 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all
            ${error ? "border-red-300 bg-red-50/30" : "border-blue-100"}`}
        />
      </div>
      {error && <p className="text-red-500 text-[11px] mt-1 font-medium">{error}</p>}
    </div>
  );
}

// ─── Mobile product card ──────────────────────────────────────────────────────

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm flex overflow-hidden">
      {/* Image */}
      <div className="w-24 h-24 flex-shrink-0 m-3 rounded-xl overflow-hidden bg-blue-50 border border-blue-100">
        <ProductImage id={product.id} />
      </div>

      {/* Info */}
      <div className="flex-1 py-3 pr-2 min-w-0 flex flex-col justify-between">
        <div>
          <p className="text-sm font-extrabold text-gray-800 truncate pr-2">{product.name}</p>
          <p className="text-xs text-blue-500 font-semibold mt-0.5">{product.brand} · {product.liter}L</p>
        </div>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-base font-black text-blue-700">₹{product.price}</span>
          <span className="text-xs text-gray-400">Dep ₹{product.depositAmount}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 justify-center pr-3 py-3 flex-shrink-0">
        <button
          onClick={() => onEdit(product)}
          className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all active:scale-90"
        >
          <EditIcon />
        </button>
        <button
          onClick={() => onDelete(product)}
          className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-all active:scale-90"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}

// ─── Add / Edit modal ─────────────────────────────────────────────────────────

const EMPTY_FORM = { name: "", brand: "", liter: "", price: "", depositAmount: "" };

function ProductModal({ product, onClose, onSave, saving }) {
  const isEdit = !!product?.id;
  const [form, setForm]     = useState(
    product
      ? { name: product.name, brand: product.brand, liter: product.liter, price: product.price, depositAmount: product.depositAmount }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState({});

  const change = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(er => ({ ...er, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())                        errs.name          = "Product name is required";
    if (!form.brand.trim())                       errs.brand         = "Brand is required";
    if (!form.liter || Number(form.liter) <= 0)   errs.liter         = "Enter valid liters";
    if (!form.price || Number(form.price) <= 0)   errs.price         = "Enter valid price";
    if (form.depositAmount === "")                errs.depositAmount = "Enter deposit (0 if none)";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      ...(isEdit ? { id: product.id } : {}),
      name:          form.name.trim(),
      brand:         form.brand.trim(),
      liter:         parseFloat(form.liter),
      price:         parseFloat(form.price),
      depositAmount: parseFloat(form.depositAmount),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" onClick={onClose}/>

      <div className="relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl shadow-2xl max-h-[94vh] overflow-y-auto">

        {/* Mobile handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-blue-200 rounded-full"/>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-blue-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              <PackageIcon />
            </div>
            <p className="font-extrabold text-blue-800 text-sm">
              {isEdit ? "Edit Product" : "Add New Product"}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition">
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-3.5">
          <FormField icon={PackageIcon} label="Product Name"      name="name"          type="text"   value={form.name}          onChange={change} placeholder="e.g. 20L Aqua Jar"  error={errors.name}/>
          <FormField icon={TagIcon}     label="Brand"             name="brand"         type="text"   value={form.brand}         onChange={change} placeholder="e.g. AquaPure"       error={errors.brand}/>
          <div className="grid grid-cols-2 gap-3">
            <FormField icon={LiterIcon} label="Liters"   name="liter" type="number" value={form.liter} onChange={change} placeholder="20" error={errors.liter}/>
            <FormField icon={PriceIcon} label="Price ₹"  name="price" type="number" value={form.price} onChange={change} placeholder="80" error={errors.price}/>
          </div>
          <FormField icon={DepositIcon} label="Deposit Amount ₹"  name="depositAmount" type="number" value={form.depositAmount} onChange={change} placeholder="200 (0 if none)"    error={errors.depositAmount}/>

          {/* Image note for edits */}
          {isEdit && (
            <div className="bg-blue-50 rounded-xl px-3.5 py-2.5 flex items-start gap-2.5">
              <span className="text-blue-400 mt-0.5 flex-shrink-0"><ImageIcon /></span>
              <p className="text-[11px] text-blue-600 font-medium leading-relaxed">
                To update the image use <code className="bg-blue-100 px-1 rounded">POST /product/{"{id}"}/image</code>
              </p>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all active:scale-95 disabled:opacity-60 shadow-md shadow-blue-200 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                {isEdit ? "Saving…" : "Adding…"}
              </>
            ) : isEdit ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminProducts() {
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [search, setSearch]       = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null);

  const { swalProps, showSwal } = useSwal();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res  = null;
    //  await getAllProducts();
      const data = res?.data || res || [];
      setProducts(data.length ? data : DUMMY_PRODUCTS);
    } catch {
      setProducts(DUMMY_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (data) => {
    setSaving(true);
    try {
      if (data.id) {
        // await updateProduct(data.id, data);
        setProducts(prev => prev.map(p => p.id === data.id ? { ...p, ...data } : p));
        showSwal({ type: "success", title: "Product Updated!", message: `${data.name} has been updated.` });
      } else {
        const res     = null
        //  await createProduct(data);
        const created = res?.data || { ...data, id: `temp-${Date.now()}` };
        setProducts(prev => [...prev, created]);
        showSwal({ type: "success", title: "Product Added!", message: `${data.name} is now live in your catalog.` });
      }
      setModalOpen(false);
    } catch {
      showSwal({ type: "error", title: "Failed to save", message: "Check your connection and try again." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (product) => {
    showSwal({
      type:        "confirm",
      title:       "Delete Product?",
      message:     `"${product.name}" will be permanently removed from your catalog.`,
      confirmText: "Yes, Delete",
      cancelText:  "Keep It",
      onConfirm: async () => {
        try {
        //   await deleteProduct(product.id);
          setProducts(prev => prev.filter(p => p.id !== product.id));
          showSwal({ type: "success", title: "Deleted!", message: `${product.name} has been removed.` });
        } catch {
          showSwal({ type: "error", title: "Delete failed", message: "Please try again." });
        }
      },
    });
  };

  const stats = {
    total:    products.length,
    brands:   [...new Set(products.map(p => p.brand))].length,
    avgPrice: products.length
      ? Math.round(products.reduce((s, p) => s + p.price, 0) / products.length)
      : 0,
  };

  // ── Full screen Loader on first fetch ──
  if (loading) return <Loader message="Loading products" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pb-32">

      {/* ── Header ── */}
      <div className="bg-blue-700 pt-6 pb-16 px-5 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-600 rounded-full opacity-50"/>
        <div className="absolute top-6 right-0 w-14 h-14 bg-blue-500 rounded-full opacity-40"/>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Catalog</p>
              <h1 className="text-white text-2xl font-extrabold tracking-tight">Products</h1>
            </div>
            <button
              onClick={() => { setEditing(null); setModalOpen(true); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-blue-700 rounded-2xl font-extrabold text-sm shadow-md hover:bg-blue-50 active:scale-95 transition-all"
            >
              <PlusIcon /> Add Product
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-3 mt-4">
            {[
              { label: "Products", val: stats.total,          color: "bg-blue-600"              },
              { label: "Brands",   val: stats.brands,         color: "bg-indigo-500"            },
              { label: "Avg Price",val: `₹${stats.avgPrice}`, color: "bg-green-400 text-green-900" },
            ].map(({ label, val, color }) => (
              <div key={label} className={`flex-1 ${color} rounded-2xl px-3 py-2 text-center`}>
                <p className="text-base font-black leading-none text-white">{val}</p>
                <p className="text-[10px] text-white/70 mt-0.5 font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-10 space-y-3">

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search by name or brand…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-blue-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-3">📦</div>
            <p className="font-bold text-gray-600">No products found</p>
            <p className="text-sm mt-1">Try a different search or add a new product</p>
            <button
              onClick={() => { setEditing(null); setModalOpen(true); }}
              className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm mx-auto hover:bg-blue-700 active:scale-95 transition-all"
            >
              <PlusIcon /> Add Product
            </button>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onEdit={(p) => { setEditing(p); setModalOpen(true); }}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-blue-50 border-b border-blue-100 text-blue-700 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Brand</th>
                    <th className="px-4 py-3">Size</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Deposit</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr key={p.id} className={`border-b border-blue-50 hover:bg-blue-50/60 transition-colors ${i % 2 ? "bg-blue-50/20" : ""}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 overflow-hidden flex-shrink-0">
                            <ProductImage id={p.id}/>
                          </div>
                          <p className="font-bold text-gray-800">{p.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{p.brand}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">{p.liter}L</span>
                      </td>
                      <td className="px-4 py-3 font-black text-blue-700">₹{p.price}</td>
                      <td className="px-4 py-3 text-gray-500 font-medium">₹{p.depositAmount}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setEditing(p); setModalOpen(true); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-lg transition-all active:scale-95"
                          >
                            <EditIcon /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold rounded-lg transition-all active:scale-95"
                          >
                            <TrashIcon /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <ProductModal
          product={editing}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          saving={saving}
        />
      )}

      <CustomSwal {...swalProps} />
    </div>
  );
}