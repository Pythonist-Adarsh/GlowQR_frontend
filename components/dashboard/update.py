import re

with open('DashboardClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Import OverviewTab at the top
content = re.sub(r'import \{ UpgradeModal \} from "@/components/dashboard/UpgradeModal";', 'import { UpgradeModal } from "@/components/dashboard/UpgradeModal";\nimport { OverviewTab } from "./OverviewTab";', content)

# Replace the overview block
start_str = '{(activeTab === "overview" || activeTab === "qr") && ('
end_str = '{activeTab === "analytics" && ('

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + '''{(activeTab === "overview" || activeTab === "qr") && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <OverviewTab 
              user={user} 
              b={b} 
              analyticsSummary={analyticsSummary} 
              qrCodes={qrCodes} 
              openUpgradeModal={setUpgradeModalOpen} 
              setActiveTab={setActiveTab} 
              reviewUrl={${API_BASE_URL}/review/} 
            />
          </div>
        )}

        ''' + content[end_idx:]
    with open('DashboardClient.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully updated DashboardClient.tsx")
else:
    print("Could not find blocks")
