import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "./imageKit";
import { FeaturedDocument } from "../interfaces/documents";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useFireStoreDocumentsStore } from "../hooks/UseFireStoreDocuments";

export const createFeaturedPhotos = async ({
    basePath,
    files,
    type
}: {
    basePath: string;
    files: File[];
    type: "vertical" | "horizontal" | "about-me";
}): Promise<void> => {
    const { addFeaturedDocument } = useFireStoreDocumentsStore();

    const uploadPromises = files.map((file) =>
        uploadFile(file, file.name, basePath)
    );

    const res = await Promise.all(uploadPromises);

    const documentPromises = res.map(async (item) => {
        const documentId = uuidv4();
        const document: FeaturedDocument = {
            id: documentId,
            name: `${item.name}`,
            fileId: item.fileId,
            url: item.url,
            type,
            createdAt: new Date(),
        };
        await setDoc(
            doc(
                db,
                `${basePath}/${documentId}`,
            ),
            document,
        );
        addFeaturedDocument(document);
    });

    await Promise.all(documentPromises);
}