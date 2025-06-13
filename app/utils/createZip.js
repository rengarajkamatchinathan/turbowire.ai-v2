import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function downloadZip(files) {
  const zip = new JSZip();

  Object.entries(files).forEach(([path, file]) => {
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    const content = file?.code ?? '';

    if (typeof content !== 'string' || content.trim() === '') {
      console.warn(`Skipping empty or invalid file: ${normalizedPath}`);
    } else {
      zip.file(normalizedPath, content);
    }
  });

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'turbowore-project.zip');
}
