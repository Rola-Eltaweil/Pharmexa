import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import {
  User,
  Mail,
  Shield,
  Calendar,
  Clock,
  Lock,
  Edit3,
  Save,
  X,
  LogOut,
  KeyRound,
} from "lucide-react";

import { getData, editData, postData } from "../../utils/apiSummary";
import { Endpoint } from "../../utils/routes";
import { toast } from "react-toastify";

const CustomerDashboard = () => {
  const user = useSelector((state) => state.user.userDetails);

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    memberSince: "",
    updatedAt: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const response = await getData(Endpoint.userDetails.url);
        const userData = response?.data?.data?.userdetails;

        if (userData) {
          setProfile({
            name: userData.name || "",
            email: userData.email || "",
            role: userData.role || "user",
            status: userData.status || "Active",
            memberSince: userData.createdAt || "",
            updatedAt: userData.updatedAt || "",
          });
        }
      } catch (error) {
        console.error("Failed to get user details:", error);
      }
    };

    loadUserDetails();
  }, []);

  useEffect(() => {
    if (!user || Array.isArray(user)) return;

    setProfile({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
      status: user.status || "Active",
      memberSince: user.createdAt || "",
      updatedAt: user.updatedAt || "",
    });
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    if (!profile.name.trim() || profile.name.trim().length < 3) {
      alert("Name must be at least 3 characters");
      return;
    }

    if (!profile.email.trim()) {
      alert("Email is required");
      return;
    }

    try {
      setLoading(true);

      const response = await editData(Endpoint.updateProfile.url, {
        name: profile.name.trim(),
        email: profile.email.trim(),
      });

      const updatedUser = response?.data?.data;

      if (updatedUser) {
        setProfile((prev) => ({
          ...prev,
          name: updatedUser.name || prev.name,
          email: updatedUser.email || prev.email,
          role: updatedUser.role || prev.role,
          status: updatedUser.status || prev.status,
          memberSince: updatedUser.createdAt || prev.memberSince,
          updatedAt: updatedUser.updatedAt || prev.updatedAt,
        }));
      }

      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Update profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdatePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    if (newPassword.length < 8) {
      alert("New password must be at least 8 characters");
      return;
    }

    if (!/[a-z]/.test(newPassword)) {
      alert("New password must contain at least one lowercase letter");
      return;
    }

    if (!/[A-Z]/.test(newPassword)) {
      alert("New password must contain at least one uppercase letter");
      return;
    }

    try {
      setPasswordLoading(true);

      await editData(Endpoint.changePassword.url, {
        currentPassword,
        newPassword,
      });

      toast.success("Password changed successfully");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPasswordForm(false);
    } catch (error) {
      console.error("Change password error:", error);

      alert(error?.response?.data?.message || "Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  // =========================
  // Logout
  // =========================

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await postData(Endpoint.logout.url, {});

      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);

      alert(error?.response?.data?.message || "Failed to logout");
    } finally {
      setLogoutLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatRole = (role) => {
    if (!role) return "Customer";

    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const firstName = profile.name ? profile.name.split(" ")[0] : "Customer";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Customer Dashboard
            </h1>

            <p className="mt-1 text-gray-500">
              Welcome back,{" "}
              <span className="font-semibold text-blue-800">{firstName}</span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-5 py-2.5 font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut size={18} />

            {logoutLoading ? "Logging out..." : "Logout"}
          </button>
        </div>

        {/* Profile Information */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Profile Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your personal account information
              </p>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800 transition hover:bg-blue-100"
              >
                <Edit3 size={17} />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
              >
                <X size={17} />
                Cancel
              </button>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              {isEditing ? (
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
                  <User size={18} className="text-blue-700" />

                  <span className="text-gray-800">{profile.name || "—"}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>

              {isEditing ? (
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
                  <Mail size={18} className="text-blue-700" />

                  <span className="break-all text-gray-800">
                    {profile.email || "—"}
                  </span>
                </div>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Role
              </label>

              <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
                <Shield size={18} className="text-blue-700" />

                <span className="text-gray-800">
                  {formatRole(profile.role)}
                </span>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Account Status
              </label>

              <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                <span className="font-medium text-green-600">
                  {profile.status || "Active"}
                </span>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleUpdateProfile}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-blue-800 px-5 py-2.5 font-medium text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={18} />

                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        {/* Security */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                <Lock size={21} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Security
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Keep your account secure by updating your password
                </p>
              </div>
            </div>

            {!showPasswordForm && (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800 transition hover:bg-blue-100"
              >
                <KeyRound size={17} />
                Change Password
              </button>
            )}
          </div>

          {showPasswordForm && (
            <div className="mt-6 border-t border-gray-100 pt-6">
              <div className="grid gap-5 md:grid-cols-3">
                {/* Current Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Current Password
                  </label>

                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Current password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* New Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    New Password
                  </label>

                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="New password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowPasswordForm(false);

                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                  className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdatePassword}
                  disabled={passwordLoading}
                  className="flex items-center gap-2 rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Lock size={17} />

                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Account Information */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Account Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Information about your account
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Status */}
            <div className="rounded-xl bg-gray-50 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <Shield size={19} />
              </div>

              <p className="text-sm text-gray-500">Status</p>

              <p className="mt-1 font-semibold text-green-600">
                {profile.status || "Active"}
              </p>
            </div>

            {/* Member Since */}
            <div className="rounded-xl bg-gray-50 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <Calendar size={19} />
              </div>

              <p className="text-sm text-gray-500">Member Since</p>

              <p className="mt-1 font-semibold text-gray-800">
                {formatDate(profile.memberSince)}
              </p>
            </div>

            {/* Last Updated */}
            <div className="rounded-xl bg-gray-50 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <Clock size={19} />
              </div>

              <p className="text-sm text-gray-500">Last Updated</p>

              <p className="mt-1 font-semibold text-gray-800">
                {formatDate(profile.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
