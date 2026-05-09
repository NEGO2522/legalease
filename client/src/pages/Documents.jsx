import { useState } from "react";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";

const stampDutyByCity = {
  Jaipur: 500,
  Delhi: 100,
  Mumbai: 500,
  Bangalore: 200,
  Chennai: 200,
  Hyderabad: 300,
  Pune: 500,
  Kolkata: 100,
  Ahmedabad: 300,
  Lucknow: 200,
};

const Documents = ({ page }) => {
  const { t, language } = useLanguage();
  const [activeDoc, setActiveDoc] = useState(null);
  const [step, setStep] = useState(1);

  const [rentForm, setRentForm] = useState({
    landlordName: "",
    tenantName: "",
    address: "",
    rent: "",
    duration: "",
    startDate: "",
    city: "",
    witness1: "",
    witness2: "",
  });

  const [affidavitForm, setAffidavitForm] = useState({
    name: "",
    fatherName: "",
    address: "",
    purpose: "",
    city: "",
    date: "",
    witness1: "",
    witness2: "",
  });

  const handlePrint = () => window.print();
  const getStampDuty = (city) => stampDutyByCity[city] || 200;

  const docTypes = [
    {
      id: "rent",
      titleKey: "rentAgreement",
      descKey: "rentDesc",
      tag: "Property Law",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#031636]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: "affidavit",
      titleKey: "affidavit",
      descKey: "affidavitDesc",
      tag: "General Law",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#031636]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  // ─── RENT PREVIEW ───
  const RentPreview = () => {
    const stamp = getStampDuty(rentForm.city);
    const isHindi = language === "Hindi";
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-800 leading-relaxed">
        <h2 className="text-center text-lg font-bold text-[#031636] mb-1">
          {isHindi ? "किराया समझौता" : "RENT AGREEMENT"}
        </h2>
        <p className="text-center text-xs text-gray-400 mb-2">{t("draftOnly")} {t("draftWarning")}</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 mb-4 text-center">
          <p className="text-yellow-800 text-xs font-semibold">
            {t("stampDuty")} {rentForm.city || "—"}: <span className="text-[#031636]">₹{stamp}</span>
          </p>
        </div>

        {isHindi ? (
          <>
            <p>यह किराया समझौता <strong>{rentForm.startDate || "___"}</strong> को निम्नलिखित पक्षों के बीच किया गया है:</p>
            <div className="mt-3 mb-3">
              <p><strong>मकान मालिक:</strong> {rentForm.landlordName || "___"}</p>
              <p className="mt-1"><strong>किरायेदार:</strong> {rentForm.tenantName || "___"}</p>
            </div>
            <p><strong>संपत्ति का पता:</strong> {rentForm.address || "___"}, {rentForm.city || "___"}</p>
            <div className="mt-4">
              <p><strong>नियम एवं शर्तें:</strong></p>
              <ol className="list-decimal ml-5 mt-2 flex flex-col gap-1.5">
                <li>मासिक किराया <strong>₹{rentForm.rent || "___"}</strong> होगा, जो प्रत्येक माह की 5 तारीख तक देय होगा।</li>
                <li>इस समझौते की अवधि <strong>{rentForm.startDate || "___"}</strong> से <strong>{rentForm.duration || "___"} माह</strong> होगी।</li>
                <li>किरायेदार परिसर का उपयोग केवल आवासीय उद्देश्यों के लिए करेगा।</li>
                <li>किरायेदार मकान मालिक की लिखित अनुमति के बिना परिसर को उप-किराए पर नहीं देगा।</li>
                <li>कोई भी पक्ष एक महीने की लिखित सूचना देकर इस समझौते को समाप्त कर सकता है।</li>
                <li>यह समझौता भारत के कानूनों द्वारा शासित होगा।</li>
              </ol>
            </div>
            <div className="mt-8 flex justify-between">
              <div className="text-center">
                <div className="border-t border-gray-400 w-28 mt-8 mb-1"></div>
                <p className="text-xs">मकान मालिक</p>
                <p className="text-xs text-gray-400">{rentForm.landlordName || "___"}</p>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 w-28 mt-8 mb-1"></div>
                <p className="text-xs">किरायेदार</p>
                <p className="text-xs text-gray-400">{rentForm.tenantName || "___"}</p>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-500 mb-3">गवाह:</p>
              <div className="flex justify-between">
                <div className="text-center">
                  <div className="border-t border-gray-400 w-28 mt-6 mb-1"></div>
                  <p className="text-xs">गवाह 1</p>
                  <p className="text-xs text-gray-400">{rentForm.witness1 || "___"}</p>
                </div>
                <div className="text-center">
                  <div className="border-t border-gray-400 w-28 mt-6 mb-1"></div>
                  <p className="text-xs">गवाह 2</p>
                  <p className="text-xs text-gray-400">{rentForm.witness2 || "___"}</p>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-4">स्थान: {rentForm.city || "___"}</p>
          </>
        ) : (
          <>
            <p>This Rent Agreement is made on <strong>{rentForm.startDate || "___"}</strong> between:</p>
            <div className="mt-3 mb-3">
              <p><strong>Landlord:</strong> {rentForm.landlordName || "___"}</p>
              <p className="mt-1"><strong>Tenant:</strong> {rentForm.tenantName || "___"}</p>
            </div>
            <p><strong>Property:</strong> {rentForm.address || "___"}, {rentForm.city || "___"}</p>
            <div className="mt-4">
              <p><strong>Terms:</strong></p>
              <ol className="list-decimal ml-5 mt-2 flex flex-col gap-1.5">
                <li>Monthly rent: <strong>₹{rentForm.rent || "___"}</strong>, payable by 5th of every month.</li>
                <li>Duration: <strong>{rentForm.duration || "___"} months</strong> from <strong>{rentForm.startDate || "___"}</strong>.</li>
                <li>Premises to be used for residential purposes only.</li>
                <li>Tenant shall not sublet without written consent of Landlord.</li>
                <li>Either party may terminate with one month's written notice.</li>
                <li>Governed by the laws of India.</li>
              </ol>
            </div>
            <div className="mt-8 flex justify-between">
              <div className="text-center">
                <div className="border-t border-gray-400 w-28 mt-8 mb-1"></div>
                <p className="text-xs">Landlord</p>
                <p className="text-xs text-gray-400">{rentForm.landlordName || "___"}</p>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 w-28 mt-8 mb-1"></div>
                <p className="text-xs">Tenant</p>
                <p className="text-xs text-gray-400">{rentForm.tenantName || "___"}</p>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-500 mb-3">Witnesses:</p>
              <div className="flex justify-between">
                <div className="text-center">
                  <div className="border-t border-gray-400 w-28 mt-6 mb-1"></div>
                  <p className="text-xs">Witness 1</p>
                  <p className="text-xs text-gray-400">{rentForm.witness1 || "___"}</p>
                </div>
                <div className="text-center">
                  <div className="border-t border-gray-400 w-28 mt-6 mb-1"></div>
                  <p className="text-xs">Witness 2</p>
                  <p className="text-xs text-gray-400">{rentForm.witness2 || "___"}</p>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-4">Place: {rentForm.city || "___"}</p>
          </>
        )}
      </div>
    );
  };

  // ─── AFFIDAVIT PREVIEW ───
  const AffidavitPreview = () => {
    const stamp = getStampDuty(affidavitForm.city);
    const isHindi = language === "Hindi";
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-800 leading-relaxed">
        <h2 className="text-center text-lg font-bold text-[#031636] mb-1">
          {isHindi ? "शपथ पत्र" : "AFFIDAVIT"}
        </h2>
        <p className="text-center text-xs text-gray-400 mb-2">{t("draftOnly")} {t("draftWarning")}</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 mb-4 text-center">
          <p className="text-yellow-800 text-xs font-semibold">
            {t("stampDuty")} {affidavitForm.city || "—"}: <span className="text-[#031636]">₹{stamp}</span>
          </p>
        </div>

        {isHindi ? (
          <>
            <p>मैं, <strong>{affidavitForm.name || "___"}</strong>, पुत्र/पुत्री <strong>{affidavitForm.fatherName || "___"}</strong>, निवासी <strong>{affidavitForm.address || "___"}</strong>, एतद्द्वारा शपथपूर्वक घोषणा करता/करती हूं:</p>
            <div className="mt-4 mb-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p>{affidavitForm.purpose || "[ घोषणा ]"}</p>
            </div>
            <p>मैं घोषणा करता/करती हूं कि इस शपथ पत्र की सामग्री मेरी जानकारी और विश्वास के अनुसार सत्य और सही है।</p>
            <div className="mt-8 flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-500">दिनांक: {affidavitForm.date || "___"}</p>
                <p className="text-xs text-gray-500">स्थान: {affidavitForm.city || "___"}</p>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 w-28 mb-1"></div>
                <p className="text-xs">शपथकर्ता</p>
                <p className="text-xs text-gray-400">{affidavitForm.name || "___"}</p>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-500 mb-3">गवाह:</p>
              <div className="flex justify-between">
                <div className="text-center">
                  <div className="border-t border-gray-400 w-28 mt-6 mb-1"></div>
                  <p className="text-xs">गवाह 1</p>
                  <p className="text-xs text-gray-400">{affidavitForm.witness1 || "___"}</p>
                </div>
                <div className="text-center">
                  <div className="border-t border-gray-400 w-28 mt-6 mb-1"></div>
                  <p className="text-xs">गवाह 2</p>
                  <p className="text-xs text-gray-400">{affidavitForm.witness2 || "___"}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-200 pt-4 text-center">
              <div className="border-t border-gray-400 w-32 mx-auto mt-4 mb-1"></div>
              <p className="text-xs text-gray-400">नोटरी / शपथ आयुक्त</p>
            </div>
          </>
        ) : (
          <>
            <p>I, <strong>{affidavitForm.name || "___"}</strong>, son/daughter of <strong>{affidavitForm.fatherName || "___"}</strong>, residing at <strong>{affidavitForm.address || "___"}</strong>, do hereby solemnly affirm and declare as under:</p>
            <div className="mt-4 mb-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p>{affidavitForm.purpose || "[ Declaration ]"}</p>
            </div>
            <p>I declare that the contents of this affidavit are true and correct to the best of my knowledge and belief.</p>
            <div className="mt-8 flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-500">Date: {affidavitForm.date || "___"}</p>
                <p className="text-xs text-gray-500">Place: {affidavitForm.city || "___"}</p>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 w-28 mb-1"></div>
                <p className="text-xs">Deponent</p>
                <p className="text-xs text-gray-400">{affidavitForm.name || "___"}</p>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-500 mb-3">Witnesses:</p>
              <div className="flex justify-between">
                <div className="text-center">
                  <div className="border-t border-gray-400 w-28 mt-6 mb-1"></div>
                  <p className="text-xs">Witness 1</p>
                  <p className="text-xs text-gray-400">{affidavitForm.witness1 || "___"}</p>
                </div>
                <div className="text-center">
                  <div className="border-t border-gray-400 w-28 mt-6 mb-1"></div>
                  <p className="text-xs">Witness 2</p>
                  <p className="text-xs text-gray-400">{affidavitForm.witness2 || "___"}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-200 pt-4 text-center">
              <div className="border-t border-gray-400 w-32 mx-auto mt-4 mb-1"></div>
              <p className="text-xs text-gray-400">Notary / Oath Commissioner</p>
            </div>
          </>
        )}
      </div>
    );
  };

  // ─── FORM FIELD ───
  const Field = ({ label, fieldKey, form, setForm, placeholder, type = "text" }) => (
    <div>
      <label className="text-xs font-semibold text-gray-500 mb-1.5 block">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[fieldKey]}
        onChange={(e) => setForm({ ...form, [fieldKey]: e.target.value })}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#031636] transition-all text-gray-800 placeholder:text-gray-300"
      />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#fbf8fc]">
      <Navbar />

      <main className="max-w-md mx-auto w-full pb-24 px-5">

        {/* ─── HOME ─── */}
        {!activeDoc && (
          <>
            <div className="mt-6 mb-5">
              <h2 className="text-xl font-bold text-[#031636]">{t("legalDraft")}</h2>
              <p className="text-gray-400 text-sm mt-1">{t("draftDesc")}</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-6 flex gap-3 items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-yellow-800 text-xs leading-relaxed">
                <strong>{t("draftOnly")}</strong> {t("draftWarning")}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {docTypes.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => { setActiveDoc(doc.id); setStep(1); }}
                  className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-all text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center shrink-0">
                    {doc.icon}
                  </div>
                  <div className="flex-1">
                    <span className="bg-yellow-50 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full font-bold">{doc.tag}</span>
                    <h3 className="text-base font-bold text-[#031636] mt-1">{t(doc.titleKey)}</h3>
                    <p className="text-gray-400 text-xs mt-1">{t(doc.descKey)}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ─── RENT AGREEMENT ─── */}
        {activeDoc === "rent" && (
          <>
            <div className="flex items-center gap-3 mt-6 mb-5">
              <button
                onClick={() => { step === 1 ? setActiveDoc(null) : setStep(1); }}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#031636]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="text-lg font-bold text-[#031636]">{t("rentAgreement")}</h2>
                <p className="text-xs text-gray-400">{step === 1 ? t("fillDetails") : t("previewDoc")}</p>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-[#031636]" : "bg-gray-200"}`}></div>
              <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-[#031636]" : "bg-gray-200"}`}></div>
            </div>

            {step === 1 ? (
              <div className="flex flex-col gap-4">
                <Field label={t("landlordName")} fieldKey="landlordName" form={rentForm} setForm={setRentForm} placeholder="Ramesh Kumar" />
                <Field label={t("tenantName")} fieldKey="tenantName" form={rentForm} setForm={setRentForm} placeholder="Suresh Singh" />
                <Field label={t("propertyAddress")} fieldKey="address" form={rentForm} setForm={setRentForm} placeholder="123, MG Road" />
                <Field label={t("city")} fieldKey="city" form={rentForm} setForm={setRentForm} placeholder="Jaipur" />
                <Field label={t("monthlyRent")} fieldKey="rent" form={rentForm} setForm={setRentForm} placeholder="10000" />
                <Field label={t("durationMonths")} fieldKey="duration" form={rentForm} setForm={setRentForm} placeholder="11" />
                <Field label={t("startDate")} fieldKey="startDate" form={rentForm} setForm={setRentForm} placeholder="" type="date" />
                <Field label={t("witness1")} fieldKey="witness1" form={rentForm} setForm={setRentForm} placeholder="Mahesh Sharma" />
                <Field label={t("witness2")} fieldKey="witness2" form={rentForm} setForm={setRentForm} placeholder="Dinesh Verma" />

                {rentForm.city && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-yellow-800 text-xs">
                      {t("stampDuty")} {rentForm.city}: <strong>₹{getStampDuty(rentForm.city)}</strong>
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-[#031636] text-white py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-all active:scale-95 mt-2"
                >
                  {t("previewBtn")}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <RentPreview />
                <button
                  onClick={handlePrint}
                  className="w-full bg-[#031636] text-white py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  {t("printBtn")}
                </button>
              </div>
            )}
          </>
        )}

        {/* ─── AFFIDAVIT ─── */}
        {activeDoc === "affidavit" && (
          <>
            <div className="flex items-center gap-3 mt-6 mb-5">
              <button
                onClick={() => { step === 1 ? setActiveDoc(null) : setStep(1); }}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#031636]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="text-lg font-bold text-[#031636]">{t("affidavit")}</h2>
                <p className="text-xs text-gray-400">{step === 1 ? t("fillDetails") : t("previewDoc")}</p>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-[#031636]" : "bg-gray-200"}`}></div>
              <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-[#031636]" : "bg-gray-200"}`}></div>
            </div>

            {step === 1 ? (
              <div className="flex flex-col gap-4">
                <Field label={t("yourFullName")} fieldKey="name" form={affidavitForm} setForm={setAffidavitForm} placeholder="Ramesh Kumar" />
                <Field label={t("fatherName")} fieldKey="fatherName" form={affidavitForm} setForm={setAffidavitForm} placeholder="Suresh Kumar" />
                <Field label={t("residentialAddress")} fieldKey="address" form={affidavitForm} setForm={setAffidavitForm} placeholder="123, MG Road, Jaipur" />
                <Field label={t("city")} fieldKey="city" form={affidavitForm} setForm={setAffidavitForm} placeholder="Jaipur" />
                <Field label={t("date")} fieldKey="date" form={affidavitForm} setForm={setAffidavitForm} placeholder="" type="date" />

                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">{t("purposeDeclaration")}</label>
                  <textarea
                    rows={4}
                    placeholder={t("purposePlaceholder")}
                    value={affidavitForm.purpose}
                    onChange={(e) => setAffidavitForm({ ...affidavitForm, purpose: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#031636] transition-all text-gray-800 placeholder:text-gray-300 resize-none"
                  />
                </div>

                <Field label={t("witness1")} fieldKey="witness1" form={affidavitForm} setForm={setAffidavitForm} placeholder="Mahesh Sharma" />
                <Field label={t("witness2")} fieldKey="witness2" form={affidavitForm} setForm={setAffidavitForm} placeholder="Dinesh Verma" />

                {affidavitForm.city && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-yellow-800 text-xs">
                      {t("stampDuty")} {affidavitForm.city}: <strong>₹{getStampDuty(affidavitForm.city)}</strong>
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-[#031636] text-white py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-all active:scale-95 mt-2"
                >
                  {t("previewBtn")}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <AffidavitPreview />
                <button
                  onClick={handlePrint}
                  className="w-full bg-[#031636] text-white py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  {t("printBtn")}
                </button>
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
};

export default Documents;