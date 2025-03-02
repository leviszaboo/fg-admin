import imageCompression from "browser-image-compression";

const MAX_MEGAPIXELS = 25; 
const MAX_FILE_SIZE_MB = 20;

export async function resizeImageIfNeeded(file: File): Promise<File> {
    if (!file.type.startsWith("image/")) {
        throw new Error("Provided file is not an image.");
    }

    const fileSizeMB = file.size / (1024 * 1024); 
    const image = await loadImage(file);
    const megapixels = (image.width * image.height) / 1_000_000; 

    // console.log(`Original Image - Size: ${fileSizeMB.toFixed(2)} MB, Resolution: ${image.width}x${image.height} (${megapixels.toFixed(2)} MP)`);

    if (megapixels <= MAX_MEGAPIXELS && fileSizeMB <= MAX_FILE_SIZE_MB) {
        return file; 
    }

    const options = {
        maxSizeMB: MAX_FILE_SIZE_MB, 
        maxWidthOrHeight: Math.sqrt(MAX_MEGAPIXELS * 1_000_000), 
        useWebWorker: true, 
    };

    const compressedBlob = await imageCompression(file, options);
    return new File([compressedBlob], file.name, { type: file.type });
}

function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}
