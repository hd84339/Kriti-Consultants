import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { fadeUp, viewportOptions } from '../../animations/variants'
import { LayoutDashboard, Users, Folders, LogOut, ShieldAlert, CheckCircle, Trash2, Globe, BookOpen, Edit, Plus, UploadCloud } from 'lucide-react'
import { 
  createAdmin, getApplications, updateApplicationStatus, deleteApplication, getAllAdmins,
  fetchBlogs, createBlog, updateBlog, deleteBlog, seedBlogs, getAssessmentLeads, deleteAssessmentLead
} from '../../services/api'
import BlogEditorModal from '../../components/admin/BlogEditorModal'
import { BLOGS as sampleBlogs } from '../../constants/blogs'

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(null)
  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'applications' | 'admins' | 'blogs' | 'leads'
  
  // Applications State
  const [applications, setApplications] = useState([])
  const [loadingApps, setLoadingApps] = useState(true)

  // Admins List State (Super Admin Only)
  const [adminsList, setAdminsList] = useState([])
  const [loadingAdminsList, setLoadingAdminsList] = useState(false)

  // Blogs State
  const [blogsList, setBlogsList] = useState([])
  const [loadingBlogs, setLoadingBlogs] = useState(true)
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [seedingLoading, setSeedingLoading] = useState(false)

  // Assessment Leads State
  const [assessmentLeads, setAssessmentLeads] = useState([])
  const [loadingLeads, setLoadingLeads] = useState(true)

  // Add Admin Form State
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', role: 'admin' })
  const [formStatus, setFormStatus] = useState('idle')
  const [formMessage, setFormMessage] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const userStr = localStorage.getItem('adminUser')
    const tokenStr = localStorage.getItem('adminToken')
    if (userStr && tokenStr) {
      const parsedUser = JSON.parse(userStr)
      setAdmin(parsedUser)
      setToken(tokenStr)
      fetchApps(tokenStr)
      fetchBlogsList()
      fetchLeads(tokenStr)
      
      // Fetch admins list if user is a super admin
      if (parsedUser.role === 'super-admin') {
        fetchAdminsList(tokenStr)
      }
    } else {
      navigate('/admin/login')
    }
  }, [navigate])

  const fetchApps = async (authToken) => {
    try {
      const res = await getApplications(authToken)
      if (res.success) {
        setApplications(res.applications)
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error)
    } finally {
      setLoadingApps(false)
    }
  }

  const fetchLeads = async (authToken) => {
    setLoadingLeads(true)
    try {
      const res = await getAssessmentLeads(authToken)
      if (res.success) {
        setAssessmentLeads(res.leads)
      }
    } catch (error) {
      console.error("Failed to fetch assessment leads:", error)
    } finally {
      setLoadingLeads(false)
    }
  }

  const handleDeleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assessment lead?")) return;
    try {
      await deleteAssessmentLead(id, token)
      setAssessmentLeads(assessmentLeads.filter(lead => lead._id !== id))
    } catch (error) {
      console.error("Failed to delete assessment lead:", error)
      alert("Failed to delete assessment lead")
    }
  }

  const fetchAdminsList = async (authToken) => {
    setLoadingAdminsList(true)
    try {
      const res = await getAllAdmins(authToken)
      if (res.success) {
        setAdminsList(res.admins)
      }
    } catch (error) {
      console.error("Failed to fetch admins list:", error)
    } finally {
      setLoadingAdminsList(false)
    }
  }

  const fetchBlogsList = async () => {
    setLoadingBlogs(true)
    try {
      const res = await fetchBlogs()
      if (res.success) {
        setBlogsList(res.blogs)
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    } finally {
      setLoadingBlogs(false)
    }
  }

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Completed' ? 'New' : 'Completed'
    try {
      const res = await updateApplicationStatus(id, newStatus, token)
      if (res.success) {
        setApplications(apps => apps.map(app => app._id === id ? { ...app, status: newStatus } : app))
      }
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const handleDeleteApp = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      const res = await deleteApplication(id, token)
      if (res.success) {
        setApplications(apps => apps.filter(app => app._id !== id))
      }
    } catch (error) {
      console.error("Error deleting application:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    navigate('/admin/login')
  }

  const handleCreateAdmin = async (e) => {
    e.preventDefault()
    setFormStatus('loading')
    setFormMessage('')
    try {
      const res = await createAdmin(newAdmin, token)
      if (res.success) {
        setFormStatus('success')
        setFormMessage('Admin created successfully!')
        setNewAdmin({ name: '', email: '', password: '', role: 'admin' })
        // Refresh admins list
        fetchAdminsList(token)
        setTimeout(() => setFormStatus('idle'), 3000)
      } else {
        throw new Error(res.message || 'Failed to create admin')
      }
    } catch (err) {
      setFormStatus('error')
      setFormMessage(err.message || 'Error creating admin')
    }
  }

  // --- BLOG HANDLERS ---
  const handleSeedBlogs = async () => {
    if (!window.confirm("This will wipe existing database blogs and import the hardcoded sample data. Are you sure?")) return;
    setSeedingLoading(true);
    try {
      // Map static images to string paths so they can be saved in DB
      const blogsToSeed = sampleBlogs.map(b => ({
        ...b,
        image: typeof b.image === 'string' ? b.image : '/images/placeholder.jpg' // Fallback for static imports if needed, though they resolve to strings in Vite build
      }));
      
      const res = await seedBlogs({ blogs: blogsToSeed }, token);
      if (res.success) {
        alert("Blogs seeded successfully!");
        fetchBlogsList();
      }
    } catch (error) {
      console.error("Error seeding blogs:", error);
      alert("Failed to seed blogs.");
    } finally {
      setSeedingLoading(false);
    }
  }

  const handleSaveBlog = async (blogData) => {
    try {
      if (editingBlog) {
        await updateBlog(editingBlog._id, blogData, token);
      } else {
        await createBlog(blogData, token);
      }
      setIsBlogModalOpen(false);
      setEditingBlog(null);
      fetchBlogsList();
    } catch (error) {
      console.error("Error saving blog:", error);
      alert(error.response?.data?.message || "Failed to save blog");
    }
  }

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await deleteBlog(id, token);
      fetchBlogsList();
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  }

  const openCreateBlog = () => {
    setEditingBlog(null);
    setIsBlogModalOpen(true);
  }

  const openEditBlog = (blog) => {
    setEditingBlog(blog);
    setIsBlogModalOpen(true);
  }

  if (!admin) return <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-white border-r border-gold/20 flex flex-col min-h-screen md:fixed md:top-0 md:left-0 md:bottom-0 z-10">
        <div className="p-6">
          <h2 className="font-serif text-xl font-bold text-navy">Admin Portal</h2>
          <p className="text-xs text-navy/50 mt-1">Logged in as {admin.name}</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-navy text-white shadow-md' : 'text-navy/70 hover:bg-gold/10 hover:text-navy'}`}
          >
            <LayoutDashboard size={18} />
            Overview
          </button>
          
          <button 
            onClick={() => setActiveTab('applications')}
            className={`w-full flex justify-between items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'applications' ? 'bg-navy text-white shadow-md' : 'text-navy/70 hover:bg-gold/10 hover:text-navy'}`}
          >
            <div className="flex items-center gap-3">
              <Folders size={18} />
              Applications
            </div>
            {!loadingApps && applications.length > 0 && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === 'applications' ? 'bg-white/20 text-white' : 'bg-gold/20 text-navy'}`}>
                {applications.length}
              </span>
            )}
          </button>

          <button 
            onClick={() => setActiveTab('blogs')}
            className={`w-full flex justify-between items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'blogs' ? 'bg-navy text-white shadow-md' : 'text-navy/70 hover:bg-gold/10 hover:text-navy'}`}
          >
            <div className="flex items-center gap-3">
              <BookOpen size={18} />
              Manage Blogs
            </div>
            {!loadingBlogs && blogsList.length > 0 && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === 'blogs' ? 'bg-white/20 text-white' : 'bg-gold/20 text-navy'}`}>
                {blogsList.length}
              </span>
            )}
          </button>

          <button 
            onClick={() => setActiveTab('admins')}
            className={`w-full flex justify-between items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'admins' ? 'bg-navy text-white shadow-md' : 'text-navy/70 hover:bg-gold/10 hover:text-navy'}`}
          >
            <div className="flex items-center gap-3">
              <Users size={18} />
              Manage Admins
            </div>
            {admin.role === 'super-admin' && adminsList.length > 0 && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === 'admins' ? 'bg-white/20 text-white' : 'bg-gold/20 text-navy'}`}>
                {adminsList.length}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => window.open('/', '_blank')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-navy/70 hover:bg-gold/10 hover:text-navy mt-4"
          >
            <Globe size={18} />
            View Website
          </button>
        </nav>

        <div className="p-4 border-t border-gold/20">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Logout Account
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 p-6 md:p-10 lg:p-12 overflow-x-hidden">
        <AnimatePresence mode="wait">
          
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h1 className="font-serif text-3xl font-bold text-navy">Dashboard Overview</h1>
                <p className="text-sm text-navy/60 mt-2">Welcome back to the Kriti Biz admin panel.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gold/20">
                  <h3 className="text-xs font-bold text-navy/40 uppercase tracking-widest mb-6">Profile Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] text-navy/40 uppercase tracking-wider mb-1">Name</p>
                      <p className="text-navy font-medium text-sm">{admin.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-navy/40 uppercase tracking-wider mb-1">Email</p>
                      <p className="text-navy font-medium text-sm">{admin.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-navy/40 uppercase tracking-wider mb-1">Role</p>
                      <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-semibold rounded-full border border-gold/20 mt-1">
                        {admin.role === 'super-admin' ? 'Super Admin' : 'Admin'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0B1120] p-6 rounded-2xl shadow-xl border border-white/5 relative overflow-hidden group flex flex-col justify-center">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl pointer-events-none group-hover:bg-gold/20 transition-colors duration-500" />
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4 relative z-10">Total Consultation Leads</h3>
                  <div className="text-6xl font-serif font-bold text-white mb-2 relative z-10">{loadingApps ? '-' : applications.length}</div>
                  <p className="text-white/40 text-xs relative z-10">Captured applications pending review.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: APPLICATIONS */}
          {activeTab === 'applications' && (
            <motion.div 
              key="applications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8">
                <h1 className="font-serif text-3xl font-bold text-navy">Consultation Applications</h1>
                <p className="text-sm text-navy/60 mt-2">Review all business leads submitted through the website funnel.</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gold/20 overflow-hidden">
                <div className="p-4 border-b border-gold/10 flex justify-between items-center bg-[#FAF8F5]/50">
                  <h2 className="font-semibold text-navy text-sm">All Submissions</h2>
                  <span className="bg-gold/10 text-gold text-xs font-bold px-3 py-1 rounded-full">{applications.length} Leads</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                      <tr className="bg-navy/5 text-navy/50 text-[10px] uppercase tracking-wider font-bold">
                        <th className="p-4 border-b border-gold/10">Date & Status</th>
                        <th className="p-4 border-b border-gold/10">Contact Details</th>
                        <th className="p-4 border-b border-gold/10">Company</th>
                        <th className="p-4 border-b border-gold/10">Scale Metrics</th>
                        <th className="p-4 border-b border-gold/10 w-1/4">Core Bottleneck</th>
                        <th className="p-4 border-b border-gold/10 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold/10 text-sm">
                      {loadingApps ? (
                        <tr>
                          <td colSpan="6" className="p-8 text-center text-navy/40">Loading applications...</td>
                        </tr>
                      ) : applications.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="p-8 text-center text-navy/40">No applications received yet.</td>
                        </tr>
                      ) : (
                        applications.map((app) => (
                          <tr key={app._id} className={`hover:bg-gold/5 transition-colors ${app.status === 'Completed' ? 'opacity-50' : ''}`}>
                            <td className="p-4 text-navy/60 whitespace-nowrap">
                              <div className="text-xs">{new Date(app.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                              <div className={`text-[10px] uppercase tracking-widest font-bold mt-1 ${app.status === 'Completed' ? 'text-green-600' : 'text-gold'}`}>
                                {app.status || 'New'}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="font-semibold text-navy whitespace-nowrap">{app.name}</div>
                              <div className="text-[10px] text-navy/50 uppercase tracking-wide mt-0.5">{app.designation}</div>
                              <div className="text-[10px] text-navy/60 mt-1">📞 {app.mobile}</div>
                            </td>
                            <td className="p-4 font-medium text-navy/80 whitespace-nowrap">
                              <div>{app.company}</div>
                              <span className="bg-navy/5 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-navy/50 mt-1 inline-block">{app.industry}</span>
                            </td>
                            <td className="p-4">
                              <div className="text-xs text-navy/80 whitespace-nowrap"><span className="text-navy/40 mr-1">Rev:</span> {app.revenue}</div>
                              <div className="text-xs text-navy/80 whitespace-nowrap mt-1"><span className="text-navy/40 mr-1">Team:</span> {app.teamSize}</div>
                            </td>
                            <td className="p-4 text-navy/70 text-xs leading-relaxed italic">
                              "{app.bottleneck}"
                            </td>
                            <td className="p-4 text-right whitespace-nowrap">
                              <button 
                                onClick={() => handleStatusToggle(app._id, app.status)}
                                className={`p-2 rounded-lg transition-colors mr-2 ${app.status === 'Completed' ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-navy/40 hover:text-navy hover:bg-navy/5'}`}
                                title={app.status === 'Completed' ? 'Mark as New' : 'Mark as Completed'}
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button 
                                onClick={() => handleDeleteApp(app._id)}
                                className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Assessment Leads Section within Applications Tab */}
              <div className="mt-8 flex justify-between items-end">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-navy">Business Assessment Leads</h2>
                  <p className="text-sm text-navy/60 mt-2">Leads generated from the Business Health & Operational Leakage Assessment.</p>
                </div>
                <button 
                  onClick={() => fetchLeads(token)}
                  className="px-4 py-2 bg-white border border-gold/30 text-navy font-semibold text-sm rounded-lg hover:bg-gold/10 transition-colors"
                >
                  Refresh Leads
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gold/20 overflow-hidden mt-4">
                <div className="p-4 border-b border-gold/10 flex justify-between items-center bg-[#FAF8F5]/50">
                  <h2 className="font-semibold text-navy text-sm">Assessment Submissions</h2>
                  <span className="bg-gold/10 text-gold text-xs font-bold px-3 py-1 rounded-full">{assessmentLeads.length} Leads</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                      <tr className="bg-navy/5 text-navy/50 text-[10px] uppercase tracking-wider font-bold">
                        <th className="p-4 border-b border-gold/10">Date</th>
                        <th className="p-4 border-b border-gold/10">Contact Details</th>
                        <th className="p-4 border-b border-gold/10">Company & Scale</th>
                        <th className="p-4 border-b border-gold/10">Health Score</th>
                        <th className="p-4 border-b border-gold/10">Annual Leakage</th>
                        <th className="p-4 border-b border-gold/10 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold/10 text-sm">
                      {loadingLeads ? (
                        <tr>
                          <td colSpan="6" className="p-8 text-center text-navy/40">Loading assessment leads...</td>
                        </tr>
                      ) : assessmentLeads.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="p-8 text-center text-navy/40">No assessment leads received yet.</td>
                        </tr>
                      ) : (
                        assessmentLeads.map((lead) => (
                          <tr key={lead._id} className="hover:bg-gold/5 transition-colors">
                            <td className="p-4 text-navy/60 whitespace-nowrap">
                              <div className="text-xs">{new Date(lead.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                            </td>
                            <td className="p-4">
                              <div className="font-semibold text-navy whitespace-nowrap">{lead.name}</div>
                              <div className="text-[10px] text-navy/60 mt-1">📧 {lead.email}</div>
                              <div className="text-[10px] text-navy/60 mt-1">📞 {lead.phone}</div>
                            </td>
                            <td className="p-4">
                              <div className="font-medium text-navy/80 whitespace-nowrap">{lead.company || '-'}</div>
                              <div className="text-xs text-navy/80 mt-1"><span className="text-navy/40 mr-1">Rev:</span> ₹{lead.revenue?.toLocaleString('en-IN')}</div>
                              {lead.industry && <span className="bg-navy/5 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-navy/50 mt-1 inline-block">{lead.industry}</span>}
                            </td>
                            <td className="p-4">
                              <div className={`text-xl font-black ${lead.overallScore < 40 ? 'text-red-600' : lead.overallScore < 60 ? 'text-red-500' : lead.overallScore < 80 ? 'text-yellow-500' : 'text-green-500'}`}>
                                {lead.overallScore}/100
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="text-red-500 font-bold text-lg">
                                ₹{lead.annualLeakage?.toLocaleString('en-IN')}
                              </div>
                              <div className="text-[10px] text-red-400 mt-1 uppercase font-bold">{lead.leakagePercentage}% Structural Leakage</div>
                            </td>
                            <td className="p-4 text-right">
                              <button 
                                onClick={() => handleDeleteLead(lead._id)}
                                className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors inline-block"
                                title="Delete Lead"
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}



          {/* TAB: BLOGS */}
          {activeTab === 'blogs' && (
            <motion.div 
              key="blogs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                  <h1 className="font-serif text-3xl font-bold text-navy">Manage Blogs</h1>
                  <p className="text-sm text-navy/60 mt-2">Create, edit, and delete articles on the public knowledge hub.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleSeedBlogs} 
                    disabled={seedingLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gold/30 text-navy font-semibold text-sm rounded-lg hover:bg-gold/10 transition-colors disabled:opacity-50"
                  >
                    <UploadCloud size={16} className="text-gold" />
                    {seedingLoading ? 'Seeding...' : 'Seed Sample Data'}
                  </button>
                  <button 
                    onClick={openCreateBlog} 
                    className="flex items-center gap-2 btn-primary px-4 py-2 text-sm"
                  >
                    <Plus size={16} /> Create New Blog
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gold/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-navy/5 text-navy/50 text-[10px] uppercase tracking-wider font-bold">
                        <th className="p-4 border-b border-gold/10">Title & Category</th>
                        <th className="p-4 border-b border-gold/10">Author</th>
                        <th className="p-4 border-b border-gold/10">Published</th>
                        <th className="p-4 border-b border-gold/10 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold/10 text-sm">
                      {loadingBlogs ? (
                        <tr>
                          <td colSpan="4" className="p-8 text-center text-navy/40">Loading blogs...</td>
                        </tr>
                      ) : blogsList.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="p-8 text-center text-navy/40">No blogs found. Create one or seed data.</td>
                        </tr>
                      ) : (
                        blogsList.map((blog) => (
                          <tr key={blog._id} className="hover:bg-gold/5 transition-colors">
                            <td className="p-4">
                              <div className="font-semibold text-navy">{blog.title}</div>
                              <div className="text-[10px] uppercase font-bold text-gold mt-1">
                                {blog.category}
                              </div>
                            </td>
                            <td className="p-4 text-navy/70 whitespace-nowrap">{blog.author}</td>
                            <td className="p-4 text-navy/70 whitespace-nowrap">{new Date(blog.createdAt).toLocaleDateString()}</td>
                            <td className="p-4 text-right whitespace-nowrap">
                              <button 
                                onClick={() => openEditBlog(blog)}
                                className="p-2 rounded-lg text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-colors mr-2"
                                title="Edit Blog"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                onClick={() => handleDeleteBlog(blog._id)}
                                className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete Blog"
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Blog Editor Modal */}
              <BlogEditorModal 
                isOpen={isBlogModalOpen}
                onClose={() => setIsBlogModalOpen(false)}
                initialData={editingBlog}
                onSave={handleSaveBlog}
              />
            </motion.div>
          )}

          {/* TAB: ADMINS */}
          {activeTab === 'admins' && (
            <motion.div 
              key="admins"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8 flex justify-between items-end">
                <div>
                  <h1 className="font-serif text-3xl font-bold text-navy">Manage Admins</h1>
                  <p className="text-sm text-navy/60 mt-2">Manage access and team members for the system.</p>
                </div>
                {admin.role === 'super-admin' && (
                  <div className="bg-gold/10 text-gold px-4 py-2 rounded-lg font-bold text-sm">
                    {adminsList.length} Total Admins
                  </div>
                )}
              </div>

              {admin.role === 'super-admin' ? (
                <div className="space-y-8">
                  {/* List of Current Admins */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gold/20 overflow-hidden">
                    <div className="p-4 border-b border-gold/10 flex justify-between items-center bg-[#FAF8F5]/50">
                      <h2 className="font-semibold text-navy text-sm">Current System Administrators</h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-navy/5 text-navy/50 text-[10px] uppercase tracking-wider font-bold">
                            <th className="p-4 border-b border-gold/10">Name</th>
                            <th className="p-4 border-b border-gold/10">Email Address</th>
                            <th className="p-4 border-b border-gold/10">Role</th>
                            <th className="p-4 border-b border-gold/10">Added On</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gold/10 text-sm">
                          {loadingAdminsList ? (
                            <tr>
                              <td colSpan="4" className="p-6 text-center text-navy/40">Loading admins...</td>
                            </tr>
                          ) : (
                            adminsList.map((adminUser) => (
                              <tr key={adminUser._id} className="hover:bg-gold/5 transition-colors">
                                <td className="p-4 font-semibold text-navy whitespace-nowrap">{adminUser.name}</td>
                                <td className="p-4 text-navy/70 whitespace-nowrap">{adminUser.email}</td>
                                <td className="p-4">
                                  <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md ${adminUser.role === 'super-admin' ? 'bg-gold/20 text-gold' : 'bg-navy/10 text-navy/60'}`}>
                                    {adminUser.role === 'super-admin' ? 'Super Admin' : 'Admin'}
                                  </span>
                                </td>
                                <td className="p-4 text-navy/50 text-xs whitespace-nowrap">
                                  {new Date(adminUser.createdAt).toLocaleDateString()}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Add New Admin Form */}
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gold/20">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center text-navy"><ShieldAlert size={24} /></div>
                      <div>
                        <h3 className="text-lg font-bold text-navy">Create New Administrator</h3>
                        <p className="text-xs text-navy/50">Only super-admins can create new accounts.</p>
                      </div>
                    </div>
                    
                    <form onSubmit={handleCreateAdmin} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Full Name</label>
                          <input type="text" value={newAdmin.name} onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})} required className="w-full bg-[#FAF8F5] border border-gold/20 rounded-lg px-4 py-3 text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-gold/60 focus:bg-white transition-all" placeholder="e.g. John Doe" />
                        </div>
                        <div>
                          <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Email Address</label>
                          <input type="email" value={newAdmin.email} onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})} required className="w-full bg-[#FAF8F5] border border-gold/20 rounded-lg px-4 py-3 text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-gold/60 focus:bg-white transition-all" placeholder="john@kriticonsultants.com" />
                        </div>
                        <div>
                          <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Temporary Password</label>
                          <input type="password" value={newAdmin.password} onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})} required className="w-full bg-[#FAF8F5] border border-gold/20 rounded-lg px-4 py-3 text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-gold/60 focus:bg-white transition-all" placeholder="••••••••" />
                        </div>
                        <div>
                          <label className="block text-navy/70 text-[10px] font-bold uppercase tracking-widest mb-2">Account Role</label>
                          <select value={newAdmin.role} onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})} className="w-full bg-[#FAF8F5] border border-gold/20 rounded-lg px-4 py-3 text-navy text-sm focus:outline-none focus:border-gold/60 focus:bg-white transition-all">
                            <option value="admin">Standard Admin (View Only)</option>
                            <option value="super-admin">Super Admin (Full Access)</option>
                          </select>
                        </div>
                      </div>

                      {formMessage && (
                        <div className={`p-4 rounded-lg text-sm text-center font-medium ${formStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                          {formMessage}
                        </div>
                      )}

                      <button type="submit" disabled={formStatus === 'loading'} className="btn-primary w-full sm:w-auto px-8 py-3 text-sm mt-4">
                        {formStatus === 'loading' ? 'Creating Account...' : 'Create Admin Account'}
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-12 rounded-2xl shadow-sm border border-gold/20 flex flex-col justify-center items-center text-center max-w-2xl">
                  <div className="w-20 h-20 bg-navy/5 rounded-full flex items-center justify-center mb-6 text-navy/30">
                    <ShieldAlert size={40} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-navy mb-2">Restricted Access</h3>
                  <p className="text-navy/60 text-sm max-w-sm">You do not have the necessary permissions to view or add new admin users. Please contact your system super-admin.</p>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
