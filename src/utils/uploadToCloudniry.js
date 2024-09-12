const cloud_name = "dxtfsef43";
const upload_preset = "aman-social";

export const uploadToCloudniry = async (pics, fileType) => {
    if (pics && fileType) {
        try {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", upload_preset);

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`, {
                method: "POST",
                body: data,
            });

            // Check if the response is OK
            if (!response.ok) {
                // Log the response status and text for debugging
                const errorText = await response.text();
                console.error(`Error: ${response.status} ${response.statusText}`, errorText);
                return;
            }

            const fileData = await response.json();
            console.log("Uploaded file URL:", fileData.url);
            return fileData.url;

        } catch (error) {
            console.error("Upload failed:", error);
        }
    } else {
        console.error("File or fileType is missing");
    }
};
