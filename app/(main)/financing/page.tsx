"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, FileText, CheckCircle, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export default function FinancingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    civilStatus: "",
    address: "",
    employmentStatus: "",
    monthlyIncome: "",
    employer: "",
    yearsEmployed: "",
    vehicleId: "",
    vehicleName: "",
    downPayment: "",
    loanTerm: "36",
  });

  const requirements = [
    "2 Valid Government IDs (with photo and signature)",
    "Proof of Income (Latest Payslip or ITR)",
    "Proof of Billing (Latest utility bill)",
    "Initial Down Payment",
  ];

  const benefits = [
    {
      icon: CheckCircle,
      label: "No Bank Approval",
      desc: "Skip traditional bank requirements",
    },
    {
      icon: DollarSign,
      label: "Flexible Terms",
      desc: "12 to 60 months payment options",
    },
    {
      icon: FileText,
      label: "Simple Requirements",
      desc: "Just 2 IDs and proof of income",
    },
    {
      icon: Calculator,
      label: "Competitive Rates",
      desc: "Starting at 0.90% monthly interest",
    },
  ];

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/financing`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast("Application submitted!", {
          description: "We'll contact you shortly to review your application.",
        });
        router.push("/");
      } else {
        toast("Submission failed", {
          description: "Please try again or contact support if the issue persists.",
        });
      }
    } catch (err) {
      toast("Something went wrong", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Financing Application</h1>
          <p className="text-xl text-gray-600">
            Get approved in as fast as 1 day. No bank approval needed.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold text-lg mb-4">Why Choose Us?</h3>
                <div className="space-y-4">
                  {benefits.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-lg">
                        <item.icon className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{item.label}</h4>
                        <p className="text-xs text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Requirements</h3>
                <ul className="space-y-2 text-sm">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>First Name *</Label>
                        <Input
                          required
                          value={formData.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Middle Name</Label>
                        <Input
                          value={formData.middleName}
                          onChange={(e) => handleChange("middleName", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Last Name *</Label>
                        <Input
                          required
                          value={formData.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Birth Date *</Label>
                        <Input
                          type="date"
                          required
                          value={formData.birthDate}
                          onChange={(e) => handleChange("birthDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Phone *</Label>
                        <Input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label>Civil Status *</Label>
                        <Select
                          value={formData.civilStatus}
                          onValueChange={(value) => handleChange("civilStatus", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Single">Single</SelectItem>
                            <SelectItem value="Married">Married</SelectItem>
                            <SelectItem value="Widowed">Widowed</SelectItem>
                            <SelectItem value="Separated">Separated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="md:col-span-2">
                        <Label>Complete Address *</Label>
                        <Input
                          required
                          value={formData.address}
                          onChange={(e) => handleChange("address", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Employment Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Employment Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Employment Status *</Label>
                        <Select
                          value={formData.employmentStatus}
                          onValueChange={(value) =>
                            handleChange("employmentStatus", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Employed">Employed</SelectItem>
                            <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                            <SelectItem value="Business Owner">Business Owner</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Monthly Income *</Label>
                        <Input
                          type="number"
                          required
                          value={formData.monthlyIncome}
                          onChange={(e) =>
                            handleChange("monthlyIncome", e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <Label>Employer / Company</Label>
                        <Input
                          value={formData.employer}
                          onChange={(e) => handleChange("employer", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label>Years Employed</Label>
                        <Input
                          type="number"
                          value={formData.yearsEmployed}
                          onChange={(e) =>
                            handleChange("yearsEmployed", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Loan Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Loan Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Down Payment *</Label>
                        <Input
                          type="number"
                          required
                          value={formData.downPayment}
                          onChange={(e) => handleChange("downPayment", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label>Loan Term *</Label>
                        <Select
                          value={formData.loanTerm}
                          onValueChange={(value) => handleChange("loanTerm", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12">12 months</SelectItem>
                            <SelectItem value="24">24 months</SelectItem>
                            <SelectItem value="36">36 months</SelectItem>
                            <SelectItem value="48">48 months</SelectItem>
                            <SelectItem value="60">60 months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Application"}
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    By submitting, you agree to our Terms and Conditions and Privacy Policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}