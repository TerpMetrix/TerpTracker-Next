import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';

export const BackButton = () => {
    const router = useRouter();
    return (
<button type="button" onClick={() => router.back()} className="btn btn-neutral uppercase mx-8">
<ArrowLeft size={16} />
Back
</button>
    )
}

export default BackButton;