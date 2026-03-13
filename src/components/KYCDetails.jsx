import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { 
  ArrowLeft, 
  Check, 
  Camera, 
  Images, 
  FileUp, 
  AlertCircle, 
  Info 
} from 'lucide-react';
import { kycDocumentSchema } from '../lib/validations';

export function KYCDetails() {
  const navigate = useNavigate();
  const panInputRef = useRef(null);
  const gstInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(kycDocumentSchema),
    mode: 'onChange',
    defaultValues: {
      panFile: null,
      gstFile: null
    }
  });

  const panFile = watch('panFile');
  const gstFile = watch('gstFile');

  const handlePanUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('panFile', file, { shouldValidate: true });
    }
  };

  const handleGstUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('gstFile', file, { shouldValidate: true });
    }
  };

  const onSubmit = () => {
    navigate('/document-upload');
  };

  const handleBack = () => {
    navigate('/signup-login');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center p-4 justify-between">
          <button 
            onClick={handleBack}
            className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Business Verification</h2>
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto px-4 pb-24">
        {/* Introduction */}
        <div className="py-6">
          <h3 className="text-slate-900 dark:text-slate-100 tracking-tight text-2xl font-bold leading-tight pb-2">Upload Business Documents</h3>
          <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal">Please provide your PAN and GST details to verify your business account and unlock higher limits.</p>
        </div>

        {/* Document Stack */}
        <div className="space-y-6">
          {/* PAN Card Box */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">PAN Card</h3>
              <span className="text-xs font-medium px-2 py-1 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Required</span>
            </div>
            <input 
              type="file" 
              ref={panInputRef}
              onChange={handlePanUpload}
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
            />
            <div 
              onClick={() => panInputRef.current?.click()}
              className={`relative group cursor-pointer`}
            >
              <div className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-4 transition-all hover:border-primary hover:bg-primary/5 ${
                panFile ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : errors.panFile ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-primary/30 bg-white dark:bg-slate-800/50'
              }`}>
                {panFile ? (
                  <>
                    <div className="size-14 rounded-full bg-green-500 text-white flex items-center justify-center">
                      <Check className="w-7 h-7" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400">{panFile.name}</p>
                      <p className="text-xs text-green-600 dark:text-green-500 mt-1">Click to change file</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-4">
                      <div className="size-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Camera className="w-7 h-7" />
                      </div>
                      <div className="size-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Images className="w-7 h-7" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Take a photo or browse</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Supports JPG, PNG or PDF (Max 5MB)</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            {errors.panFile && (
              <p className="text-red-500 text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.panFile.message}
              </p>
            )}
            <input type="hidden" {...register('panFile')} />
          </div>

          {/* GST Certificate Box */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">GST Certificate</h3>
              <span className="text-xs font-medium px-2 py-1 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Required</span>
            </div>
            <input 
              type="file" 
              ref={gstInputRef}
              onChange={handleGstUpload}
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
            />
            <div 
              onClick={() => gstInputRef.current?.click()}
              className="relative group cursor-pointer"
            >
              <div className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-4 transition-all hover:border-primary hover:bg-primary/5 ${
                gstFile ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : errors.gstFile ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-primary/30 bg-white dark:bg-slate-800/50'
              }`}>
                {gstFile ? (
                  <>
                    <div className="size-14 rounded-full bg-green-500 text-white flex items-center justify-center">
                      <Check className="w-7 h-7" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400">{gstFile.name}</p>
                      <p className="text-xs text-green-600 dark:text-green-500 mt-1">Click to change file</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-4">
                      <div className="size-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <FileUp className="w-7 h-7" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Click to upload GST certificate</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">PDF preferred for GST documents</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            {errors.gstFile && (
              <p className="text-red-500 text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.gstFile.message}
              </p>
            )}
            <input type="hidden" {...register('gstFile')} />
          </div>
        </div>

        {/* Terms */}
        <div className="mt-8 flex gap-3 items-start p-4 rounded-xl bg-primary/5 border border-primary/10">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            By uploading these documents, you authorize us to verify the details with the respective government authorities. Your data is encrypted and secure.
          </p>
        </div>

        {/* Submit Button */}
        <div className="mt-8 pb-10">
          <button 
            type="submit"
            className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform hover:bg-primary/90"
          >
            Submit for Verification
          </button>
        </div>
      </form>
    </div>
  );
}
