import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Link } from 'react-router-dom'
import { Map, Target, ListTodo, Building2, DollarSign, TrendingUp, Users, BarChart3, Settings } from 'lucide-react'
import useHydratedStaff from '../hooks/useHydratedStaff'

const featureOptions = [
  {
    title: 'Product Roadmap',
    icon: Map,
    path: '/command-central/roadmap',
  },
  {
    title: 'Company Roadmap',
    icon: Target,
    path: '/command-central/company-roadmap',
  },
  {
    title: 'Task Management',
    icon: ListTodo,
    path: '/command-central/tasks',
  },
  {
    title: 'Financial Spending',
    icon: DollarSign,
    path: '/command-central/financial-spends',
  },
  {
    title: 'Financial Projections',
    icon: TrendingUp,
    path: '/command-central/financial-projections',
  },
  {
    title: 'Company CRM',
    icon: Users,
    path: '/command-central/crm',
  },
  {
    title: 'User Metrics',
    icon: BarChart3,
    path: '/command-central/metrics',
  },
  {
    title: 'Company Settings',
    icon: Settings,
    path: '/command-central/company-settings',
  },
]

export default function GFCommandCentral() {
  const { staff, staffId, company, companyId, role } = useHydratedStaff();
  
  // Debug: Log what we actually have
  console.log('🔍 GFCommandCentral: Staff loaded:', !!staff, 'Staff ID:', staffId);
  console.log('🔍 GFCommandCentral: Company loaded:', !!company, 'Company ID:', companyId);
  console.log('🔍 GFCommandCentral: Role:', role);
  
  if (company) {
    console.log('🔍 GFCommandCentral: Company Name:', company.companyName);
    console.log('🔍 GFCommandCentral: Contacts:', company.contacts?.length || 0);
    console.log('🔍 GFCommandCentral: Tasks:', company.tasks?.length || 0);
  }
  
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-3rem)] p-6">
      <div className="w-full max-w-2xl">
        <Card className="bg-white shadow-lg">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <img src="/logo.jpg" alt="GoFast" className="h-16 w-16 rounded-full" />
            </div>
            <CardTitle className="text-3xl font-bold mb-2">Company HQ Cockpit</CardTitle>
            <p className="text-zinc-600 text-base mt-2">
              Select a feature from the sidebar to get started
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {featureOptions.map((option) => {
              const Icon = option.icon
              return (
                <Link key={option.path} to={option.path}>
                  <div className="flex items-center gap-3 p-4 rounded-lg border border-zinc-200 hover:bg-zinc-50 hover:shadow-md transition cursor-pointer">
                    <div className="p-2 rounded-md bg-zinc-100">
                      <Icon className="h-5 w-5 text-zinc-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-zinc-900">{option.title}</div>
                      <div className="text-sm text-zinc-500">Click to manage</div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

