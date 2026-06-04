import os

with open('components/dashboard/SettingsTab.tsx', 'r', encoding='utf-8') as f:
    data = f.read()

target = """      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      setProfileSuccess(true);
      if (onUpdate) onUpdate();
      setTimeout(() => setProfileSuccess(false), 3000);"""

replacement = """      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      const resData = await res.json();
      if (resData.new_token) {
        localStorage.setItem("token", resData.new_token);
      }

      setProfileSuccess(true);
      if (onUpdate) onUpdate();
      setTimeout(() => setProfileSuccess(false), 3000);"""

data = data.replace(target, replacement)

with open('components/dashboard/SettingsTab.tsx', 'w', encoding='utf-8') as f:
    f.write(data)
print('Patched SettingsTab.tsx')
