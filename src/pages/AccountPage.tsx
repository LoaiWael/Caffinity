import React, { useState, useEffect } from "react";
import { User, ShoppingBag, MapPin, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

type Tab = "dashboard" | "orders" | "profile" | "addresses";

interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  order_items: OrderItem[];
}

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const { profile, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (authLoading)
    return <div className="text-center py-20">Loading account...</div>;
  if (!profile) {
    navigate("/login");
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab profile={profile} />;
      case "orders":
        return <OrdersTab />;
      case "profile":
        return <ProfileTab profile={profile} />;
      case "addresses":
        return <AddressesTab />;
      default:
        return null;
    }
  };

  const NavItem = ({
    tab,
    icon: Icon,
    label,
  }: {
    tab: Tab;
    icon: React.ElementType;
    label: string;
  }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-md transition-colors ${
        activeTab === tab
          ? "bg-brand-gray-light text-brand-black font-semibold"
          : "hover:bg-brand-gray-light text-brand-black/70"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="bg-brand-gray-light min-h-[calc(100vh-12rem)]">
      <div className="container mx-auto px-6 py-12">
        <h1 className="font-heading text-4xl mb-8">My Account</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow-sm h-fit">
            <nav className="space-y-2">
              <NavItem tab="dashboard" icon={User} label="Dashboard" />
              <NavItem tab="orders" icon={ShoppingBag} label="Orders" />
              <NavItem tab="profile" icon={User} label="Profile Details" />
              <NavItem tab="addresses" icon={MapPin} label="Addresses" />
              <button
                onClick={() => {
                  const conf = window.confirm(
                    "Are you sure you want to logout?"
                  );
                  if (!conf) return;
                  logout();
                  navigate("/");
                }}
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-md transition-colors hover:bg-brand-gray-light text-brand-black/70"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </aside>
          <main className="md:col-span-3 bg-white p-8 rounded-lg shadow-sm">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

// ---------------- Tabs ----------------

const DashboardTab = ({ profile }: { profile: any }) => (
  <div>
    <h2 className="font-heading text-2xl mb-4">Hello, {profile.firstName}!</h2>
    <p className="text-brand-black/70">
      From your account dashboard you can view your recent orders, manage your
      shipping addresses, and edit your account details.
    </p>
  </div>
);

const OrdersTab = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading order history...</div>;
  if (orders.length === 0) return <div>You have no past orders.</div>;

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Order History</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-brand-gray rounded-md p-4"
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
              <div>
                <h3 className="font-semibold">Order #{order.id}</h3>
                <p className="text-sm text-brand-black/70">
                  Date: {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  Total: €{order.total_amount.toFixed(2)}
                </p>
                <p className="text-sm capitalize text-brand-black/70">
                  Status: {order.status}
                </p>
              </div>
            </div>
            <div className="border-t border-brand-gray pt-4">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-2">
                  <div className="w-16 h-16 object-cover rounded-md bg-brand-gray-light flex items-center justify-center text-sm">
                    Img
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-brand-black/70">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileTab = ({ profile }: { profile: any }) => (
  <div>
    <h2 className="font-heading text-2xl mb-6">Profile Details</h2>
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            defaultValue={profile.firstName || ""}
            className="w-full px-4 py-3 border border-brand-gray rounded-md bg-brand-gray-light"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            defaultValue={profile.lastName || ""}
            className="w-full px-4 py-3 border border-brand-gray rounded-md bg-brand-gray-light"
            readOnly
          />
        </div>
      </div>
      <Button className="mt-4" disabled>
        Save Changes (Not Implemented)
      </Button>
    </form>
  </div>
);

const AddressesTab = () => (
  <div>
    <h2 className="font-heading text-2xl mb-6">My Addresses</h2>
    <p className="text-brand-black/70">
      Address management is not yet implemented.
    </p>
    <Button variant="outline" className="mt-8" disabled>
      Add New Address
    </Button>
  </div>
);

export default AccountPage;
