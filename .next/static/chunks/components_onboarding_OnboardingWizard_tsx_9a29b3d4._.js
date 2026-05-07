(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/onboarding/OnboardingWizard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OnboardingWizard",
    ()=>OnboardingWizard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.mjs [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/store.mjs [app-client] (ecmascript) <export default as Store>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coffee.mjs [app-client] (ecmascript) <export default as Coffee>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wine$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wine.mjs [app-client] (ecmascript) <export default as Wine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chef$2d$hat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChefHat$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chef-hat.mjs [app-client] (ecmascript) <export default as ChefHat>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadCloud$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cloud-upload.mjs [app-client] (ecmascript) <export default as UploadCloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.mjs [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.mjs [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.mjs [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2e$react$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qrcode.react/lib/esm/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
// Lazy load ReviewFlow for simulation to keep initial bundle smaller
const ReviewFlow = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/components/review/ReviewFlow.tsx [app-client] (ecmascript, async loader)"));
_c = ReviewFlow;
const steps = [
    {
        id: 'basics',
        title: 'Basic Info'
    },
    {
        id: 'logo',
        title: 'Logo Setup'
    },
    {
        id: 'type',
        title: 'Business Type'
    },
    {
        id: 'menu',
        title: 'Menu Items'
    }
];
const businessTypes = [
    {
        id: 'restaurant',
        name: 'Restaurant',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chef$2d$hat$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChefHat$3e$__["ChefHat"]
    },
    {
        id: 'cafe',
        name: 'Café / Coffee Shop',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__["Coffee"]
    },
    {
        id: 'bar',
        name: 'Bar / Lounge',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wine$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wine$3e$__["Wine"]
    },
    {
        id: 'store',
        name: 'Retail Store',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"]
    }
];
function OnboardingWizard() {
    _s();
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // State for form
    const [businessName, setBusinessName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [tagline, setTagline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [location, setLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [googleReviewLink, setGoogleReviewLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [logo, setLogo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [businessType, setBusinessType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [menuItems, setMenuItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [primaryColor, setPrimaryColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('#F07C3C');
    const [showQRPopup, setShowQRPopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showFinalQR, setShowFinalQR] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSimulatingScan, setIsSimulatingScan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isScanningLocal, setIsScanningLocal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [logoPreview, setLogoPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleNext = ()=>{
        if (currentStep < steps.length - 1) {
            setCurrentStep((s)=>s + 1);
        } else {
            setShowQRPopup(true);
            // Transition to success state
            setTimeout(()=>{
                setShowFinalQR(true);
            }, 2000);
        }
    };
    const getReviewUrl = ()=>{
        // In a real app, this would be a shortened URL pointing to the business ID
        // For now, we encode the business info for the demo
        const data = {
            name: businessName || "Your Business",
            tagline: tagline,
            location: location || "Our Location",
            primaryColor: primaryColor,
            logo: logoPreview,
            googleReviewUrl: googleReviewLink || "#",
            menuItems: menuItems.map((m)=>({
                    id: m.id,
                    name: m.name,
                    price: m.price || "",
                    category: m.category || "General",
                    subcategory: m.subcategory || "",
                    emoji: m.emoji || "🍽️"
                }))
        };
        const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
        return "".concat(window.location.origin, "/review?data=").concat(encoded);
    };
    const downloadQR = (format)=>{
        if (format === 'png') {
            const canvas = document.getElementById('qr-canvas');
            if (canvas) {
                const url = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = url;
                a.download = 'glowqr-code.png';
                a.click();
            }
        } else {
            const svg = document.getElementById('qr-svg');
            if (svg) {
                const svgData = new XMLSerializer().serializeToString(svg);
                const blob = new Blob([
                    svgData
                ], {
                    type: 'image/svg+xml;charset=utf-8'
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'glowqr-code.svg';
                a.click();
            }
        }
    };
    const handleBack = ()=>{
        if (currentStep > 0) {
            setCurrentStep((s)=>s - 1);
        } else {
            router.push('/');
        }
    };
    const [isProcessingMenu, setIsProcessingMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const addMenuItem = ()=>{
        setMenuItems([
            ...menuItems,
            {
                id: Math.random().toString(),
                name: '',
                price: '',
                category: 'General',
                subcategory: '',
                emoji: '🍽️'
            }
        ]);
    };
    const removeMenuItem = (id)=>{
        setMenuItems(menuItems.filter((item)=>item.id !== id));
    };
    const updateMenuItem = (id, field, value)=>{
        setMenuItems(menuItems.map((item)=>item.id === id ? {
                ...item,
                [field]: value
            } : item));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#FDF8F1] flex flex-col font-body",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex items-center justify-between px-6 py-5 lg:px-12 border-b border-[#E8DFD4] bg-white/50 backdrop-blur-md sticky top-0 z-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "font-display text-2xl font-bold tracking-tight text-[#3D261C]",
                        children: "GlowQR"
                    }, void 0, false, {
                        fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: steps.map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1.5 rounded-full transition-all duration-500 ease-out ".concat(i === currentStep ? 'w-8 bg-[#F07C3C]' : i < currentStep ? 'w-4 bg-[#F07C3C]/40' : 'w-4 bg-[#E8DFD4]')
                            }, step.id, false, {
                                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 flex flex-col items-center p-6 md:p-12 relative overflow-x-hidden overflow-y-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        mode: "wait",
                        children: !showQRPopup ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 1,
                                scale: 1
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.95,
                                filter: 'blur(10px)'
                            },
                            className: "w-full max-w-2xl my-auto bg-white/80 backdrop-blur-xl rounded-[var(--radius-xl)] shadow-[0_8px_40px_rgba(45,27,20,0.04)] border border-[#E8DFD4] overflow-hidden relative z-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-8 md:p-12 min-h-[420px] flex flex-col justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        mode: "wait",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                y: 10,
                                                filter: 'blur(4px)'
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0,
                                                filter: 'blur(0px)'
                                            },
                                            exit: {
                                                opacity: 0,
                                                y: -10,
                                                filter: 'blur(4px)'
                                            },
                                            transition: {
                                                duration: 0.4,
                                                ease: [
                                                    0.34,
                                                    1.56,
                                                    0.64,
                                                    1
                                                ]
                                            },
                                            className: "w-full",
                                            children: [
                                                currentStep === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: "font-display text-3xl font-bold text-[#3D261C]",
                                                                    children: "Welcome! Let's get started"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 175,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-2 text-[#5C4A3D] text-[15px]",
                                                                    children: "Tell us the name of your business and an optional tagline."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 176,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 174,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "block text-sm font-semibold text-[#3D261C] mb-1.5",
                                                                            children: "Business Name"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 181,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            value: businessName,
                                                                            onChange: (e)=>setBusinessName(e.target.value),
                                                                            placeholder: "e.g. Café Lumière",
                                                                            className: "w-full rounded-[var(--radius-md)] border border-[#E8DFD4] bg-white px-4 py-3.5 text-[15px] text-[#3D261C] outline-none transition-all placeholder:text-[#A89888] focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 182,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 180,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "block text-sm font-semibold text-[#3D261C] mb-1.5",
                                                                            children: [
                                                                                "Tagline ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[#A89888] font-normal",
                                                                                    children: "(Optional)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                    lineNumber: 191,
                                                                                    columnNumber: 101
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 191,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            value: tagline,
                                                                            onChange: (e)=>setTagline(e.target.value),
                                                                            placeholder: "e.g. The best coffee in Paris",
                                                                            className: "w-full rounded-[var(--radius-md)] border border-[#E8DFD4] bg-white px-4 py-3.5 text-[15px] text-[#3D261C] outline-none transition-all placeholder:text-[#A89888] focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 192,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 190,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "block text-sm font-semibold text-[#3D261C] mb-1.5",
                                                                            children: [
                                                                                "Location ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[#A89888] font-normal",
                                                                                    children: "(Optional)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                    lineNumber: 201,
                                                                                    columnNumber: 102
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 201,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "text",
                                                                            value: location,
                                                                            onChange: (e)=>setLocation(e.target.value),
                                                                            placeholder: "e.g. 123 Paris St, France",
                                                                            className: "w-full rounded-[var(--radius-md)] border border-[#E8DFD4] bg-white px-4 py-3.5 text-[15px] text-[#3D261C] outline-none transition-all placeholder:text-[#A89888] focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 202,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 200,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "block text-sm font-semibold text-[#3D261C] mb-1.5",
                                                                            children: [
                                                                                "Google Review Link ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[#A89888] font-normal",
                                                                                    children: "(Optional)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                    lineNumber: 211,
                                                                                    columnNumber: 112
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 211,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "url",
                                                                            value: googleReviewLink,
                                                                            onChange: (e)=>setGoogleReviewLink(e.target.value),
                                                                            placeholder: "e.g. https://g.page/r/...",
                                                                            className: "w-full rounded-[var(--radius-md)] border border-[#E8DFD4] bg-white px-4 py-3.5 text-[15px] text-[#3D261C] outline-none transition-all placeholder:text-[#A89888] focus:border-[#F07C3C] focus:ring-4 focus:ring-[#F07C3C]/10"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 212,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 210,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 179,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 19
                                                }, this),
                                                currentStep === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: "font-display text-3xl font-bold text-[#3D261C]",
                                                                    children: "Add your logo"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 228,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-2 text-[#5C4A3D] text-[15px]",
                                                                    children: "This will be displayed prominently on your QR scan page."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 229,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 227,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-full max-w-sm",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "group flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-[#E8DFD4] rounded-[var(--radius-lg)] cursor-pointer bg-[#FDF8F1]/50 hover:bg-[#FDF8F1] hover:border-[#F07C3C] transition-all duration-300",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex flex-col items-center justify-center pt-5 pb-6",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                    whileHover: {
                                                                                        scale: 1.1,
                                                                                        rotate: 5
                                                                                    },
                                                                                    className: "w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:shadow-md transition-shadow text-[#A89888] group-hover:text-[#F07C3C]",
                                                                                    children: logo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                                        className: "w-7 h-7 text-green-500"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                        lineNumber: 240,
                                                                                        columnNumber: 39
                                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadCloud$3e$__["UploadCloud"], {
                                                                                        className: "w-7 h-7"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                        lineNumber: 240,
                                                                                        columnNumber: 93
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                    lineNumber: 236,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "mb-2 text-[15px] text-[#5C4A3D]",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-semibold text-[#F07C3C]",
                                                                                            children: "Click to upload"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                            lineNumber: 243,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        " or drag and drop"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                    lineNumber: 242,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-xs text-[#A89888] font-medium tracking-wide",
                                                                                    children: "SVG, PNG, JPG (MAX. 800x400px)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                    lineNumber: 245,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 235,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "file",
                                                                            accept: "image/*",
                                                                            className: "hidden",
                                                                            onChange: (e)=>{
                                                                                var _e_target_files;
                                                                                if ((_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0]) {
                                                                                    const file = e.target.files[0];
                                                                                    setLogo(file);
                                                                                    setLogoPreview(URL.createObjectURL(file));
                                                                                }
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 247,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 234,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                lineNumber: 233,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 232,
                                                            columnNumber: 21
                                                        }, this),
                                                        logo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                                            initial: {
                                                                opacity: 0,
                                                                y: 5
                                                            },
                                                            animate: {
                                                                opacity: 1,
                                                                y: 0
                                                            },
                                                            className: "text-center text-sm font-semibold text-[#3D261C]",
                                                            children: [
                                                                "Selected: ",
                                                                logo.name
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-10 pt-8 border-t border-[#E8DFD4]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-sm font-bold text-[#3D261C] mb-4 uppercase tracking-widest",
                                                                    children: "Brand Color"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 267,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-wrap gap-3 justify-center",
                                                                    children: [
                                                                        [
                                                                            '#F07C3C',
                                                                            '#C8102E',
                                                                            '#2E5BFF',
                                                                            '#00A86B',
                                                                            '#7C3AED',
                                                                            '#3D261C'
                                                                        ].map((color)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>setPrimaryColor(color),
                                                                                className: "w-10 h-10 rounded-full border-4 transition-all ".concat(primaryColor === color ? 'border-[#3D261C] scale-110 shadow-lg' : 'border-transparent hover:scale-105'),
                                                                                style: {
                                                                                    backgroundColor: color
                                                                                }
                                                                            }, color, false, {
                                                                                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                lineNumber: 270,
                                                                                columnNumber: 27
                                                                            }, this)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "color",
                                                                            value: primaryColor,
                                                                            onChange: (e)=>setPrimaryColor(e.target.value),
                                                                            className: "w-10 h-10 rounded-full border-none cursor-pointer bg-transparent overflow-hidden"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 279,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 268,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-center text-xs text-[#A89888] mt-3 font-medium",
                                                                    children: "Select your primary brand color for the review page."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 286,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 266,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 19
                                                }, this),
                                                currentStep === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: "font-display text-3xl font-bold text-[#3D261C]",
                                                                    children: "What's your business type?"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 295,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-2 text-[#5C4A3D] text-[15px]",
                                                                    children: "This helps us tailor your experience and menu setup."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 296,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 294,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-2 gap-4",
                                                            children: businessTypes.map((type)=>{
                                                                const Icon = type.icon;
                                                                const isSelected = businessType === type.id;
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setBusinessType(type.id),
                                                                    className: "group relative flex flex-col items-center justify-center p-6 rounded-[var(--radius-lg)] border-2 transition-all duration-300 ".concat(isSelected ? 'border-[#F07C3C] bg-[#FDF8F1] text-[#F07C3C] shadow-[0_4px_20px_rgba(240,124,60,0.15)]' : 'border-[#E8DFD4] bg-white hover:border-[#F07C3C]/50 hover:bg-[#FDF8F1]/50 text-[#5C4A3D]'),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mb-3 p-3 rounded-full transition-colors ".concat(isSelected ? 'bg-white shadow-sm text-[#F07C3C]' : 'bg-[#FDF8F1] text-[#8A735F] group-hover:text-[#F07C3C]'),
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                                className: "w-6 h-6"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                lineNumber: 314,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 313,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-semibold",
                                                                            children: type.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 316,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                            layoutId: "activeType",
                                                                            className: "absolute inset-0 border-2 border-[#F07C3C] rounded-[var(--radius-lg)]",
                                                                            style: {
                                                                                zIndex: -1
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 318,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, type.id, true, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 304,
                                                                    columnNumber: 27
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 299,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 19
                                                }, this),
                                                currentStep === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: "font-display text-3xl font-bold text-[#3D261C]",
                                                                    children: "Add your menu items"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 335,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "mt-2 text-[#5C4A3D] text-[15px]",
                                                                    children: "Upload an image of your menu to extract items automatically, or add them manually."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 336,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 334,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid sm:grid-cols-2 gap-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "group flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#E8DFD4] bg-[#FDF8F1]/30 rounded-[var(--radius-lg)] cursor-pointer hover:bg-[#FDF8F1] hover:border-[#F07C3C] transition-all duration-300",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:shadow-md transition-shadow text-[#8A735F] group-hover:text-[#F07C3C]",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                                                className: "w-5 h-5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                lineNumber: 342,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 341,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-semibold text-[#3D261C]",
                                                                            children: isProcessingMenu ? 'Extracting...' : 'Upload Menu Image'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 344,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[13px] text-[#A89888] text-center mt-1 leading-relaxed",
                                                                            children: isProcessingMenu ? 'Please wait while we read your menu...' : 'We&apos;ll use AI to extract your items automatically'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 347,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "file",
                                                                            accept: "image/*,.csv,.pdf",
                                                                            className: "hidden",
                                                                            onChange: (e)=>{
                                                                                if (e.target.files && e.target.files.length > 0) {
                                                                                    setIsProcessingMenu(true);
                                                                                    // Mock AI extraction delay
                                                                                    setTimeout(()=>{
                                                                                        setMenuItems((prev)=>[
                                                                                                ...prev,
                                                                                                {
                                                                                                    id: Math.random().toString(),
                                                                                                    name: 'Signature Coffee',
                                                                                                    price: '$4.50',
                                                                                                    category: 'Beverages',
                                                                                                    subcategory: 'Coffee',
                                                                                                    emoji: '☕'
                                                                                                },
                                                                                                {
                                                                                                    id: Math.random().toString(),
                                                                                                    name: 'Avocado Toast',
                                                                                                    price: '$12.00',
                                                                                                    category: 'Main Course',
                                                                                                    subcategory: 'Breakfast',
                                                                                                    emoji: '🥑'
                                                                                                },
                                                                                                {
                                                                                                    id: Math.random().toString(),
                                                                                                    name: 'Fresh Croissant',
                                                                                                    price: '$3.50',
                                                                                                    category: 'Bakery',
                                                                                                    subcategory: 'Pastries',
                                                                                                    emoji: '🥐'
                                                                                                },
                                                                                                {
                                                                                                    id: Math.random().toString(),
                                                                                                    name: 'Iced Latte',
                                                                                                    price: '$5.00',
                                                                                                    category: 'Beverages',
                                                                                                    subcategory: 'Coffee',
                                                                                                    emoji: '🥤'
                                                                                                },
                                                                                                {
                                                                                                    id: Math.random().toString(),
                                                                                                    name: 'Classic Burger',
                                                                                                    price: '$15.00',
                                                                                                    category: 'Main Course',
                                                                                                    subcategory: 'Lunch',
                                                                                                    emoji: '🍔'
                                                                                                },
                                                                                                {
                                                                                                    id: Math.random().toString(),
                                                                                                    name: 'Caesar Salad',
                                                                                                    price: '$10.00',
                                                                                                    category: 'Main Course',
                                                                                                    subcategory: 'Salads',
                                                                                                    emoji: '🥗'
                                                                                                }
                                                                                            ]);
                                                                                        setIsProcessingMenu(false);
                                                                                        e.target.value = ''; // clear input
                                                                                    }, 1500);
                                                                                }
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 350,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 340,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: addMenuItem,
                                                                    disabled: isProcessingMenu,
                                                                    className: "group flex flex-col items-center justify-center p-6 border-2 border-[#E8DFD4] bg-white rounded-[var(--radius-lg)] cursor-pointer hover:border-[#F07C3C]/50 hover:bg-[#FDF8F1] transition-all duration-300 shadow-sm hover:shadow-md",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "w-12 h-12 bg-[#FDF8F1] rounded-full flex items-center justify-center mb-3 group-hover:bg-white transition-colors text-[#8A735F] group-hover:text-[#F07C3C]",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                                className: "w-5 h-5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                lineNumber: 383,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 382,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-semibold text-[#3D261C]",
                                                                            children: "Add Manually"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 385,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[13px] text-[#A89888] text-center mt-1 leading-relaxed",
                                                                            children: "Type in your menu items one by one"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 386,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 376,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 339,
                                                            columnNumber: 21
                                                        }, this),
                                                        menuItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            initial: {
                                                                opacity: 0,
                                                                height: 0
                                                            },
                                                            animate: {
                                                                opacity: 1,
                                                                height: 'auto'
                                                            },
                                                            className: "space-y-3 mt-6 pt-6 border-t border-[#E8DFD4]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "font-semibold text-[#3D261C] mb-4",
                                                                    children: "Your Items"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 396,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                                    children: menuItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                            layout: true,
                                                                            initial: {
                                                                                opacity: 0,
                                                                                x: -20
                                                                            },
                                                                            animate: {
                                                                                opacity: 1,
                                                                                x: 0
                                                                            },
                                                                            exit: {
                                                                                opacity: 0,
                                                                                scale: 0.95
                                                                            },
                                                                            className: "flex items-center gap-3 bg-[#FDF8F1] p-2 pr-4 rounded-[var(--radius-md)] border border-[#E8DFD4]/50",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex-1 grid grid-cols-1 md:grid-cols-2 gap-3",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "flex gap-2",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                    type: "text",
                                                                                                    placeholder: "Item name",
                                                                                                    value: item.name,
                                                                                                    onChange: (e)=>updateMenuItem(item.id, 'name', e.target.value),
                                                                                                    className: "flex-1 bg-white rounded-[var(--radius-sm)] border border-[#E8DFD4] px-4 py-2.5 text-[15px] outline-none focus:border-[#F07C3C] transition-all font-medium text-[#3D261C]"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                                    lineNumber: 409,
                                                                                                    columnNumber: 35
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                    type: "text",
                                                                                                    placeholder: "Price",
                                                                                                    value: item.price,
                                                                                                    onChange: (e)=>updateMenuItem(item.id, 'price', e.target.value),
                                                                                                    className: "w-24 bg-white rounded-[var(--radius-sm)] border border-[#E8DFD4] px-4 py-2.5 text-[15px] outline-none focus:border-[#F07C3C] transition-all font-medium text-[#3D261C]"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                                    lineNumber: 416,
                                                                                                    columnNumber: 35
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                            lineNumber: 408,
                                                                                            columnNumber: 33
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "flex gap-2",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                    type: "text",
                                                                                                    placeholder: "Category",
                                                                                                    value: item.category,
                                                                                                    onChange: (e)=>updateMenuItem(item.id, 'category', e.target.value),
                                                                                                    className: "flex-1 bg-white rounded-[var(--radius-sm)] border border-[#E8DFD4] px-4 py-2.5 text-[15px] outline-none focus:border-[#F07C3C] transition-all font-medium text-[#3D261C]"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                                    lineNumber: 425,
                                                                                                    columnNumber: 35
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                    type: "text",
                                                                                                    placeholder: "Sub-cat",
                                                                                                    value: item.subcategory || '',
                                                                                                    onChange: (e)=>updateMenuItem(item.id, 'subcategory', e.target.value),
                                                                                                    className: "flex-1 bg-white rounded-[var(--radius-sm)] border border-[#E8DFD4] px-4 py-2.5 text-[15px] outline-none focus:border-[#F07C3C] transition-all font-medium text-[#3D261C]"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                                    lineNumber: 432,
                                                                                                    columnNumber: 35
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                            lineNumber: 424,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                    lineNumber: 407,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    type: "button",
                                                                                    onClick: ()=>removeMenuItem(item.id),
                                                                                    className: "p-2 text-[#A89888] hover:text-[#D94848] hover:bg-white rounded-md transition-colors",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                        className: "w-4 h-4"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                        lineNumber: 446,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                    lineNumber: 441,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, item.id, true, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 399,
                                                                            columnNumber: 29
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 397,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 391,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, currentStep, true, {
                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                        lineNumber: 162,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                    lineNumber: 161,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between p-6 md:p-8 bg-white/50 border-t border-[#E8DFD4]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleBack,
                                            className: "flex items-center gap-2 px-6 py-3 text-[#8A735F] hover:text-[#3D261C] font-semibold transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 465,
                                                    columnNumber: 15
                                                }, this),
                                                " Back"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                            lineNumber: 461,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleNext,
                                            disabled: currentStep === 0 && !businessName,
                                            className: "flex items-center gap-2 px-8 py-3 bg-[#F07C3C] text-white rounded-[var(--radius-md)] font-bold shadow-lg shadow-[#F07C3C]/20 hover:bg-[#D96321] transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                            children: [
                                                currentStep === steps.length - 1 ? 'Finish Setup' : 'Next Step',
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 472,
                                                    columnNumber: 81
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                            lineNumber: 467,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                    lineNumber: 460,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, "wizard", true, {
                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                            lineNumber: 155,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 40
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            className: "w-full max-w-3xl my-auto flex flex-col items-center relative z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                mode: "wait",
                                children: !showFinalQR ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        scale: 0.9
                                    },
                                    animate: {
                                        opacity: 1,
                                        scale: 1
                                    },
                                    exit: {
                                        opacity: 0,
                                        scale: 1.1,
                                        filter: 'blur(20px)'
                                    },
                                    className: "bg-white/90 backdrop-blur-3xl p-16 rounded-[4rem] border border-white shadow-[0_30px_100px_rgba(0,0,0,0.1)] flex flex-col items-center text-center relative overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F07C3C] to-transparent opacity-50"
                                        }, void 0, false, {
                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                            lineNumber: 493,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative w-56 h-56 mb-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    animate: {
                                                        top: [
                                                            '10%',
                                                            '90%',
                                                            '10%'
                                                        ]
                                                    },
                                                    transition: {
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    },
                                                    className: "absolute left-0 right-0 h-1 bg-[#F07C3C] shadow-[0_0_20px_#F07C3C] z-10"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 496,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 border-4 border-[#F07C3C]/20 rounded-3xl"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 501,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2e$react$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QRCodeSVG"], {
                                                        value: "generating...",
                                                        size: 120,
                                                        className: "opacity-10 grayscale"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                        lineNumber: 503,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 502,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                            lineNumber: 495,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-3xl font-display font-bold text-[#3D261C] mb-3",
                                            children: "Crafting Your Identity"
                                        }, void 0, false, {
                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                            lineNumber: 506,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[#5C4A3D]",
                                            children: "Baking in your brand colors and menu items..."
                                        }, void 0, false, {
                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                            lineNumber: 507,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, "generating", true, {
                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                    lineNumber: 485,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        scale: 0.9
                                    },
                                    animate: {
                                        opacity: 1,
                                        scale: 1
                                    },
                                    className: "w-full flex flex-col items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 -z-10 pointer-events-none",
                                            children: [
                                                ...Array(12)
                                            ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        scale: 0
                                                    },
                                                    animate: {
                                                        opacity: [
                                                            0,
                                                            1,
                                                            0
                                                        ],
                                                        scale: [
                                                            0,
                                                            1.5,
                                                            0
                                                        ],
                                                        x: (Math.random() - 0.5) * 600,
                                                        y: (Math.random() - 0.5) * 600
                                                    },
                                                    transition: {
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        delay: i * 0.2
                                                    },
                                                    className: "absolute left-1/2 top-1/2 w-4 h-4 rounded-full",
                                                    style: {
                                                        backgroundColor: i % 2 === 0 ? primaryColor : '#F07C3C'
                                                    }
                                                }, i, false, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 519,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                            lineNumber: 517,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white/90 backdrop-blur-3xl p-10 md:p-14 rounded-[4rem] border border-white shadow-[0_20px_80px_rgba(45,27,20,0.1)] flex flex-col items-center text-center w-full max-w-2xl relative overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none",
                                                    style: {
                                                        backgroundColor: primaryColor
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 537,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none",
                                                    style: {
                                                        backgroundColor: primaryColor
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 538,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        scale: 0
                                                    },
                                                    animate: {
                                                        scale: 1
                                                    },
                                                    transition: {
                                                        type: "spring",
                                                        damping: 12
                                                    },
                                                    className: "w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 shadow-inner",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        className: "w-12 h-12 text-green-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                        lineNumber: 546,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 540,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "font-display text-5xl md:text-6xl font-bold text-[#3D261C] mb-4 tracking-tight",
                                                    children: "Your QR is Ready!"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 549,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xl text-[#5C4A3D] mb-10 max-w-md mx-auto",
                                                    children: [
                                                        "It looks stunning. Scan it now to experience the premium review flow for ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold text-[#3D261C]",
                                                            children: businessName
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 550,
                                                            columnNumber: 157
                                                        }, this),
                                                        "."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 550,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative group mb-12",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            animate: {
                                                                opacity: [
                                                                    0.5,
                                                                    0.8,
                                                                    0.5
                                                                ],
                                                                scale: [
                                                                    1,
                                                                    1.05,
                                                                    1
                                                                ]
                                                            },
                                                            transition: {
                                                                duration: 3,
                                                                repeat: Infinity
                                                            },
                                                            className: "absolute inset-[-20px] rounded-[3.5rem] blur-2xl opacity-40 -z-10",
                                                            style: {
                                                                backgroundColor: primaryColor
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 553,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-white p-8 rounded-[3rem] shadow-2xl relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2e$react$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QRCodeSVG"], {
                                                                    id: "qr-svg",
                                                                    value: getReviewUrl(),
                                                                    size: 240,
                                                                    level: "H",
                                                                    includeMargin: false
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 560,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "hidden",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2e$react$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QRCodeCanvas"], {
                                                                        id: "qr-canvas",
                                                                        value: getReviewUrl(),
                                                                        size: 1024,
                                                                        level: "H",
                                                                        includeMargin: true
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                        lineNumber: 562,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 561,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 559,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 552,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 md:grid-cols-2 gap-4 w-full",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>downloadQR('png'),
                                                            className: "flex items-center justify-center gap-2 bg-[#FDF8F1] hover:bg-[#F07C3C]/10 text-[#F07C3C] border-2 border-[#F07C3C]/20 py-4 rounded-3xl font-bold text-lg transition-all",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                                    className: "w-6 h-6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 572,
                                                                    columnNumber: 27
                                                                }, this),
                                                                " Download PNG"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 568,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                setIsSimulatingScan(true);
                                                                setIsScanningLocal(true);
                                                                setTimeout(()=>setIsScanningLocal(false), 2800);
                                                            },
                                                            className: "flex items-center justify-center gap-2 bg-[#3D261C] hover:bg-[#2A1A12] text-white py-4 rounded-3xl font-bold text-lg shadow-xl shadow-[#3D261C]/20 transition-all",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                                    className: "w-6 h-6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 582,
                                                                    columnNumber: 27
                                                                }, this),
                                                                " Simulate Scan"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 574,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 567,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>router.push('/dashboard'),
                                                    className: "mt-8 flex items-center gap-2 text-[#8A735F] hover:text-[#3D261C] font-bold uppercase tracking-widest text-xs transition-colors",
                                                    children: [
                                                        "Go to Dashboard ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 590,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 586,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                            lineNumber: 535,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, "ready", true, {
                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                    lineNumber: 510,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                lineNumber: 483,
                                columnNumber: 15
                            }, this)
                        }, "success", false, {
                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                            lineNumber: 477,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: isSimulatingScan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            className: "fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsSimulatingScan(false),
                                    className: "absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-[210] p-2 hover:bg-white/10 rounded-full",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "w-8 h-8 rotate-45"
                                    }, void 0, false, {
                                        fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                        lineNumber: 613,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                    lineNumber: 609,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        y: 100,
                                        opacity: 0,
                                        scale: 0.9
                                    },
                                    animate: {
                                        y: 0,
                                        opacity: 1,
                                        scale: 1
                                    },
                                    exit: {
                                        y: -100,
                                        opacity: 0,
                                        scale: 0.9
                                    },
                                    className: "relative w-full max-w-[360px] h-[720px] bg-[#1a1a1a] rounded-[3.5rem] border-[12px] border-[#2a2a2a] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#2a2a2a] rounded-b-3xl z-50 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-1 bg-white/5 rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                lineNumber: 625,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                            lineNumber: 624,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 relative bg-white overflow-y-auto overflow-x-hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                mode: "wait",
                                                children: isScanningLocal ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 1
                                                    },
                                                    exit: {
                                                        opacity: 0,
                                                        scale: 1.1,
                                                        filter: 'blur(10px)'
                                                    },
                                                    className: "absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-8 text-center",
                                                    children: [
                                                        logoPreview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 opacity-20 blur-3xl pointer-events-none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: logoPreview,
                                                                alt: "",
                                                                className: "w-full h-full object-cover scale-150"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                lineNumber: 640,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 639,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 overflow-hidden opacity-30 pointer-events-none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                animate: {
                                                                    scale: [
                                                                        1,
                                                                        1.2,
                                                                        1
                                                                    ],
                                                                    opacity: [
                                                                        0.1,
                                                                        0.3,
                                                                        0.1
                                                                    ]
                                                                },
                                                                transition: {
                                                                    duration: 4,
                                                                    repeat: Infinity
                                                                },
                                                                className: "absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-[100px]",
                                                                style: {
                                                                    backgroundColor: primaryColor
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                lineNumber: 645,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 644,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative w-64 h-64 border-2 border-white/10 rounded-[3rem] mb-12 flex items-center justify-center overflow-hidden",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#F07C3C] rounded-tl-[2rem]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 658,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#F07C3C] rounded-tr-[2rem]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 659,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#F07C3C] rounded-bl-[2rem]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 660,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#F07C3C] rounded-br-[2rem]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 661,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                    animate: {
                                                                        top: [
                                                                            '0%',
                                                                            '100%',
                                                                            '0%'
                                                                        ]
                                                                    },
                                                                    transition: {
                                                                        duration: 2,
                                                                        repeat: Infinity,
                                                                        ease: "easeInOut"
                                                                    },
                                                                    className: "absolute left-0 right-0 h-1.5 bg-[#F07C3C] shadow-[0_0_30px_#F07C3C] z-10"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 664,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                    initial: {
                                                                        scale: 0,
                                                                        opacity: 0
                                                                    },
                                                                    animate: {
                                                                        scale: 1,
                                                                        opacity: 1
                                                                    },
                                                                    transition: {
                                                                        delay: 1,
                                                                        type: "spring"
                                                                    },
                                                                    className: "w-32 h-32 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center border border-white/20 shadow-2xl relative z-20",
                                                                    children: [
                                                                        logoPreview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                            src: logoPreview,
                                                                            alt: "Target",
                                                                            className: "w-20 h-20 object-contain"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 678,
                                                                            columnNumber: 31
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                                            className: "w-12 h-12 text-white/50"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 680,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                            animate: {
                                                                                opacity: [
                                                                                    0,
                                                                                    1,
                                                                                    0
                                                                                ]
                                                                            },
                                                                            transition: {
                                                                                duration: 1,
                                                                                repeat: Infinity,
                                                                                delay: 1.5
                                                                            },
                                                                            className: "absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                                className: "w-3 h-3 text-white"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                                lineNumber: 688,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                            lineNumber: 683,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 671,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 656,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            initial: {
                                                                y: 20,
                                                                opacity: 0
                                                            },
                                                            animate: {
                                                                y: 0,
                                                                opacity: 1
                                                            },
                                                            transition: {
                                                                delay: 0.5
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-white text-2xl font-display font-bold mb-2",
                                                                    children: "QR Detected"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 698,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-white/40 text-sm tracking-widest uppercase font-bold",
                                                                    children: [
                                                                        "Initializing ",
                                                                        businessName || 'Business'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 699,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 693,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute bottom-16 left-12 right-12 h-1 bg-white/10 rounded-full overflow-hidden",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                initial: {
                                                                    width: 0
                                                                },
                                                                animate: {
                                                                    width: '100%'
                                                                },
                                                                transition: {
                                                                    duration: 2.5,
                                                                    ease: "linear"
                                                                },
                                                                className: "h-full bg-[#F07C3C]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                lineNumber: 704,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 703,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, "viewfinder", true, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 631,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0
                                                    },
                                                    animate: {
                                                        opacity: 1
                                                    },
                                                    className: "h-full",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                                                        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-full flex flex-col items-center justify-center bg-white",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-12 h-12 border-4 border-[#F07C3C]/20 border-t-[#F07C3C] rounded-full animate-spin mb-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 721,
                                                                    columnNumber: 29
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[#3D261C] font-bold animate-pulse uppercase tracking-widest text-[10px]",
                                                                    children: "Loading Interface..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                    lineNumber: 722,
                                                                    columnNumber: 29
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 720,
                                                            columnNumber: 27
                                                        }, void 0),
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-full scale-[0.95] origin-top",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReviewFlow, {
                                                                simulationData: {
                                                                    name: businessName || "Your Business",
                                                                    tagline: tagline,
                                                                    location: location || "Our Location",
                                                                    primaryColor: primaryColor,
                                                                    logo: logoPreview,
                                                                    googleReviewUrl: googleReviewLink || "#",
                                                                    menuItems: menuItems.map((m)=>({
                                                                            id: m.id,
                                                                            name: m.name,
                                                                            emoji: m.emoji || "🍽️"
                                                                        }))
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                                lineNumber: 726,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                            lineNumber: 725,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                        lineNumber: 719,
                                                        columnNumber: 25
                                                    }, this)
                                                }, "content", false, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 713,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                lineNumber: 629,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                            lineNumber: 628,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-6 bg-white flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-32 h-1 bg-black/10 rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                lineNumber: 744,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                            lineNumber: 743,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                    lineNumber: 617,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-8 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white/60 text-sm font-medium",
                                            children: "This is exactly what your customers will see"
                                        }, void 0, false, {
                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                            lineNumber: 749,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4 mt-4 justify-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 h-2 rounded-full bg-[#F07C3C] animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 751,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 h-2 rounded-full bg-[#F07C3C] animate-pulse delay-75"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 752,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 h-2 rounded-full bg-[#F07C3C] animate-pulse delay-150"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                                    lineNumber: 753,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                            lineNumber: 750,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                                    lineNumber: 748,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                            lineNumber: 603,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                        lineNumber: 601,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/onboarding/OnboardingWizard.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_s(OnboardingWizard, "UlV3nvRr70pBI2ijB7vlYLM7d7A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = OnboardingWizard;
var _c, _c1;
__turbopack_context__.k.register(_c, "ReviewFlow");
__turbopack_context__.k.register(_c1, "OnboardingWizard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_onboarding_OnboardingWizard_tsx_9a29b3d4._.js.map