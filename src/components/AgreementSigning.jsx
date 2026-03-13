import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState, useEffect } from 'react';
import { agreementSchema } from '../lib/validations';

export function AgreementSigning() {
  const navigate = useNavigate();
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(agreementSchema),
    mode: 'onChange',
    defaultValues: {
      agreed: false,
      hasSignature: false
    }
  });

  const agreed = watch('agreed');
  const hasSignature = watch('hasSignature');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#0052cc';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  // Set canvas size on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    }
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.closePath();
      setValue('hasSignature', true, { shouldValidate: true });
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setValue('hasSignature', false, { shouldValidate: true });
  };

  const onSubmit = () => {
    navigate('/activation-success');
  };

  const handleBack = () => {
    navigate('/lender-profile');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-white dark:bg-slate-900 shadow-xl overflow-x-hidden">
        <div className="flex items-center p-4 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10 border-b border-slate-200 dark:border-slate-800">
          <button 
            onClick={handleBack}
            className="text-slate-900 dark:text-slate-100 flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 ml-2">Agreement Signing</h2>
        </div>

        <div className="flex flex-col p-4 gap-2">
          <h3 className="text-slate-900 dark:text-slate-100 tracking-tight text-2xl font-bold leading-tight">Review & Sign</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-relaxed">
            Please read the following terms and conditions carefully before proceeding with your service activation.
          </p>
        </div>

        <div className="px-4 pb-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">description</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Legal Document v2.4</span>
            </div>
            <div className="h-64 overflow-y-scroll p-4 text-sm text-slate-700 dark:text-slate-300 space-y-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
              <p className="font-bold">1. Acceptance of Terms</p>
              <p>By clicking 'I Agree' or signing this document, you acknowledge that you have read, understood, and agree to be bound by these terms. This Agreement constitutes a legally binding contract between you and the Service Provider.</p>
              <p className="font-bold">2. Service Activation</p>
              <p>Upon successful e-signature and verification, your account will be activated within 24 hours. Some services may require additional hardware configuration which will be detailed in your welcome packet.</p>
              <p className="font-bold">3. Digital Signature Legalities</p>
              <p>You agree that your electronic signature is the legal equivalent of your manual signature on this Agreement. Use of electronic signatures is governed by the Electronic Signatures in Global and National Commerce Act (ESIGN) and the Uniform Electronic Transactions Act (UETA).</p>
              <p className="font-bold">4. Data Privacy & Security</p>
              <p>We value your privacy and handle your data according to our Privacy Policy. All signature data is encrypted at rest and in transit. We do not store biometric data beyond the visual representation of the signature stroke.</p>
              <p className="font-bold">5. Termination Policy</p>
              <p>Either party may terminate this agreement with 30 days written notice. Early termination fees may apply as specified in the service tier selection page previously viewed.</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-2">
          <label className="flex items-center gap-3 p-3 rounded-lg border border-transparent active:bg-primary/5 transition-colors cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input 
                type="checkbox"
                {...register('agreed')}
                className="peer h-6 w-6 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary focus:ring-offset-0 bg-transparent transition-all checked:bg-primary" 
              />
              <span className="material-symbols-outlined absolute text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none text-sm font-bold">check</span>
            </div>
            <p className="text-slate-900 dark:text-slate-100 text-sm font-medium">I Agree to the Terms & Conditions</p>
          </label>
          {errors.agreed && (
            <p className="text-red-500 text-xs flex items-center gap-1 ml-9 mt-1">
              <span className="material-symbols-outlined text-sm">error</span>
              {errors.agreed.message}
            </p>
          )}
        </div>

        <div className="px-4 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">Digital Signature</span>
            <button 
              type="button"
              onClick={clearSignature}
              className="flex items-center gap-1 text-primary text-xs font-bold hover:underline"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              CLEAR
            </button>
          </div>
          <div 
            ref={containerRef}
            className={`relative w-full aspect-[2/1] bg-slate-50 dark:bg-slate-900 border-2 border-dashed rounded-xl flex items-center justify-center overflow-hidden cursor-crosshair touch-none ${
              errors.hasSignature ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
            }`}
          >
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="absolute inset-0 w-full h-full"
            />
            {!hasSignature && (
              <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-600 text-4xl">gesture</span>
                <p className="text-slate-400 dark:text-slate-600 text-xs">Sign with your finger here</p>
              </div>
            )}
            {/* Signature line */}
            <div className="absolute bottom-8 left-8 right-8 h-px bg-slate-300 dark:bg-slate-700 pointer-events-none"></div>
            <span className="absolute bottom-9 left-8 text-[10px] text-slate-400 dark:text-slate-600 uppercase pointer-events-none">Sign Above</span>
          </div>
          {errors.hasSignature && (
            <p className="text-red-500 text-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">error</span>
              {errors.hasSignature.message}
            </p>
          )}
        </div>

        <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <button 
            onClick={handleSubmit(onSubmit)}
            className={`w-full font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] ${
              agreed && hasSignature 
                ? 'bg-primary hover:bg-primary/90 text-white' 
                : 'bg-slate-400 text-white cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined">draw</span>
            e-Sign & Activate
          </button>
          <p className="text-center text-[10px] text-slate-500 dark:text-slate-400 mt-4 leading-normal">
            By clicking "e-Sign & Activate", you agree that your digital signature is as valid as a physical one.
          </p>
        </div>
      </div>
    </div>
  );
}
