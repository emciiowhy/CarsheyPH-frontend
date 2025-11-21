'use client';
import { useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
export default function VehicleForm({ initialData, onSuccess }: any) {
    const [form, setForm] = useState<any>({
        brand: initialData?.brand || '',
        model: initialData?.model || '',
        slug: initialData?.slug || '',
        cashPrice: initialData?.cashPrice || '',
        thumbnailUrl: initialData?.thumbnailUrl || '',
        images: initialData?.images || [],
        status: initialData?.status || 'AVAILABLE',
    });
    const [saving, setSaving] = useState(false);


    const handleChange = (k: string, v: any) => setForm((s: any) => ({ ...s, [k]: v }));


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSaving(true);
        const method = initialData ? 'PUT' : 'POST';
        const url = initialData ? `/api/admin/vehicles/${initialData.id}` : '/api/admin/vehicles';


        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });


        const json = await res.json();
        setSaving(false);
        if (!res.ok) return alert('Save failed');
        onSuccess && onSuccess(json.data);
    };


    const onUploaded = (url: string) => {
        // when image uploader returns URL
        handleChange('thumbnailUrl', url);
        handleChange('images', [{ url, alt: '', type: 'exterior', order: 0 }]);
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
            <div className="grid grid-cols-2 gap-4">
                <input value={form.brand} onChange={(e) => handleChange('brand', e.target.value)} placeholder="Brand" className="input" />
                <input value={form.model} onChange={(e) => handleChange('model', e.target.value)} placeholder="Model" className="input" />
                <input value={form.slug} onChange={(e) => handleChange('slug', e.target.value)} placeholder="Slug" className="input" />
                <input value={form.cashPrice} onChange={(e) => handleChange('cashPrice', e.target.value)} placeholder="Cash Price" className="input" />
            </div>


            <div>
                <label className="block text-sm font-medium mb-2">Main Image</label>
                <ImageUploader onUploaded={onUploaded} initialUrl={form.thumbnailUrl} />
            </div>


            <div className="flex gap-2">
                <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save Vehicle'}</button>
            </div>
        </form>
    );
}