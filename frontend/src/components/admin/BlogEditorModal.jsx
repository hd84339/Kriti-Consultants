import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadImage } from '../../services/api';

export default function BlogEditorModal({ isOpen, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: '5 min read',
    image: '',
    desc: '',
    tags: '',
    content: {
      intro: '',
      sections: [],
      quote: '',
      takeaways: [],
      metrics: []
    }
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const token = localStorage.getItem('adminToken');
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      const res = await uploadImage(formDataUpload, token);
      
      // Construct full backend URL
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const baseUrl = apiUrl.replace(/\/api$/, '');
      const fullUrl = `${baseUrl}${res.url}`;

      setFormData(prev => ({ ...prev, image: fullUrl }));
    } catch (error) {
      alert(error.message || 'Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        tags: initialData.tags ? initialData.tags.join(', ') : '',
        content: {
          intro: initialData.content?.intro || '',
          sections: initialData.content?.sections || [],
          quote: initialData.content?.quote || '',
          takeaways: initialData.content?.takeaways || [],
          metrics: initialData.content?.metrics || []
        }
      });
    } else {
      setFormData({
        title: '', category: '', author: '',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: '5 min read', image: '', desc: '', tags: '',
        content: { intro: '', sections: [], quote: '', takeaways: [], metrics: [] }
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      content: { ...prev.content, [name]: value }
    }));
  };

  // Sections Handlers
  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      content: { ...prev.content, sections: [...prev.content.sections, { heading: '', body: '' }] }
    }));
  };
  const updateSection = (index, field, value) => {
    const newSections = [...formData.content.sections];
    newSections[index][field] = value;
    setFormData(prev => ({ ...prev, content: { ...prev.content, sections: newSections } }));
  };
  const removeSection = (index) => {
    setFormData(prev => ({
      ...prev,
      content: { ...prev.content, sections: prev.content.sections.filter((_, i) => i !== index) }
    }));
  };

  // Metrics Handlers
  const addMetric = () => {
    setFormData(prev => ({
      ...prev,
      content: { ...prev.content, metrics: [...prev.content.metrics, { metric: '', before: '', after: '' }] }
    }));
  };
  const updateMetric = (index, field, value) => {
    const newMetrics = [...formData.content.metrics];
    newMetrics[index][field] = value;
    setFormData(prev => ({ ...prev, content: { ...prev.content, metrics: newMetrics } }));
  };
  const removeMetric = (index) => {
    setFormData(prev => ({
      ...prev,
      content: { ...prev.content, metrics: prev.content.metrics.filter((_, i) => i !== index) }
    }));
  };

  // Takeaways Handlers
  const addTakeaway = () => {
    setFormData(prev => ({
      ...prev,
      content: { ...prev.content, takeaways: [...prev.content.takeaways, ''] }
    }));
  };
  const updateTakeaway = (index, value) => {
    const newTakeaways = [...formData.content.takeaways];
    newTakeaways[index] = value;
    setFormData(prev => ({ ...prev, content: { ...prev.content, takeaways: newTakeaways } }));
  };
  const removeTakeaway = (index) => {
    setFormData(prev => ({
      ...prev,
      content: { ...prev.content, takeaways: prev.content.takeaways.filter((_, i) => i !== index) }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };
    onSave(submitData);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-gold/20 flex justify-between items-center bg-[#FAF8F5]">
            <h2 className="font-serif text-2xl font-bold text-navy">
              {initialData ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gold/10 text-navy/50 hover:text-navy transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="overflow-y-auto p-6 md:p-8 flex-1">
            <form id="blog-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* Basic Info */}
              <div className="space-y-6">
                <h3 className="font-semibold text-navy text-lg border-b border-gold/10 pb-2">Basic Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-navy/70 uppercase mb-2">Title *</label>
                    <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-gold/20 rounded-lg p-3 text-sm text-navy focus:outline-none focus:border-gold/60" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy/70 uppercase mb-2">Category *</label>
                    <input type="text" name="category" required value={formData.category} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-gold/20 rounded-lg p-3 text-sm text-navy focus:outline-none focus:border-gold/60" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy/70 uppercase mb-2">Author *</label>
                    <input type="text" name="author" required value={formData.author} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-gold/20 rounded-lg p-3 text-sm text-navy focus:outline-none focus:border-gold/60" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy/70 uppercase mb-2">Blog Image *</label>
                    <div className="flex flex-col gap-2">
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold hover:file:text-white transition-colors cursor-pointer" />
                      {isUploading && <span className="text-xs text-gold">Uploading image...</span>}
                      <input type="text" name="image" required value={formData.image} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-gold/20 rounded-lg p-3 text-sm text-navy focus:outline-none focus:border-gold/60" placeholder="Image URL (Auto-fills after upload or type manually)" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-navy/70 uppercase mb-2">Short Description (Preview) *</label>
                    <textarea name="desc" required value={formData.desc} onChange={handleChange} rows="2" className="w-full bg-[#FAF8F5] border border-gold/20 rounded-lg p-3 text-sm text-navy focus:outline-none focus:border-gold/60" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-navy/70 uppercase mb-2">Tags (Comma separated)</label>
                    <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-gold/20 rounded-lg p-3 text-sm text-navy focus:outline-none focus:border-gold/60" placeholder="Business, Operations, Scale" />
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-6">
                <h3 className="font-semibold text-navy text-lg border-b border-gold/10 pb-2 mt-8">Article Content</h3>
                <div>
                  <label className="block text-xs font-bold text-navy/70 uppercase mb-2">Introduction *</label>
                  <textarea name="intro" required value={formData.content.intro} onChange={handleContentChange} rows="3" className="w-full bg-[#FAF8F5] border border-gold/20 rounded-lg p-3 text-sm text-navy focus:outline-none focus:border-gold/60" />
                </div>

                {/* Dynamic Sections */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-xs font-bold text-navy/70 uppercase">Sections</label>
                    <button type="button" onClick={addSection} className="text-xs bg-gold/10 text-gold px-3 py-1.5 rounded-md hover:bg-gold hover:text-white transition-colors flex items-center gap-1">
                      <Plus size={14} /> Add Section
                    </button>
                  </div>
                  <div className="space-y-4">
                    {formData.content.sections.map((section, idx) => (
                      <div key={idx} className="p-4 border border-gold/20 rounded-lg bg-[#FAF8F5]/50 relative">
                        <button type="button" onClick={() => removeSection(idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                        <input type="text" value={section.heading} onChange={e => updateSection(idx, 'heading', e.target.value)} placeholder="Section Heading" required className="w-full bg-white border border-gold/20 rounded-lg p-3 text-sm text-navy mb-3 focus:outline-none focus:border-gold/60 pr-10" />
                        <textarea value={section.body} onChange={e => updateSection(idx, 'body', e.target.value)} placeholder="Section Body" required rows="4" className="w-full bg-white border border-gold/20 rounded-lg p-3 text-sm text-navy focus:outline-none focus:border-gold/60" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlight Quote */}
                <div>
                  <label className="block text-xs font-bold text-navy/70 uppercase mb-2">Highlight Quote (Optional)</label>
                  <textarea name="quote" value={formData.content.quote} onChange={handleContentChange} rows="2" className="w-full bg-[#FAF8F5] border border-gold/20 rounded-lg p-3 text-sm text-navy focus:outline-none focus:border-gold/60" />
                </div>

                {/* Takeaways */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-xs font-bold text-navy/70 uppercase">Key Takeaways (Checklist)</label>
                    <button type="button" onClick={addTakeaway} className="text-xs bg-gold/10 text-gold px-3 py-1.5 rounded-md hover:bg-gold hover:text-white transition-colors flex items-center gap-1">
                      <Plus size={14} /> Add Takeaway
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.content.takeaways.map((takeaway, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input type="text" value={takeaway} onChange={e => updateTakeaway(idx, e.target.value)} placeholder="Takeaway point..." required className="flex-1 bg-white border border-gold/20 rounded-lg p-3 text-sm text-navy focus:outline-none focus:border-gold/60" />
                        <button type="button" onClick={() => removeTakeaway(idx)} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-xs font-bold text-navy/70 uppercase">Transformation Metrics (Optional)</label>
                    <button type="button" onClick={addMetric} className="text-xs bg-gold/10 text-gold px-3 py-1.5 rounded-md hover:bg-gold hover:text-white transition-colors flex items-center gap-1">
                      <Plus size={14} /> Add Metric
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.content.metrics.map((m, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-[#FAF8F5]/50 p-3 rounded-lg border border-gold/20">
                        <input type="text" value={m.metric} onChange={e => updateMetric(idx, 'metric', e.target.value)} placeholder="Metric Name (e.g. Revenue)" required className="flex-1 bg-white border border-gold/20 rounded p-2 text-sm text-navy focus:outline-none" />
                        <input type="text" value={m.before} onChange={e => updateMetric(idx, 'before', e.target.value)} placeholder="Before" required className="w-24 bg-white border border-gold/20 rounded p-2 text-sm text-navy focus:outline-none" />
                        <input type="text" value={m.after} onChange={e => updateMetric(idx, 'after', e.target.value)} placeholder="After" required className="w-24 bg-white border border-gold/20 rounded p-2 text-sm text-navy focus:outline-none" />
                        <button type="button" onClick={() => removeMetric(idx)} className="text-red-400 hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </form>
          </div>

          <div className="p-6 border-t border-gold/20 bg-[#FAF8F5] flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg text-sm font-medium text-navy/60 hover:text-navy hover:bg-gold/10 transition-colors">
              Cancel
            </button>
            <button type="submit" form="blog-form" className="btn-gold px-8 py-2 text-sm">
              {initialData ? 'Save Changes' : 'Publish Blog'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
