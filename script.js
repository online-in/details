// Download All functionality using JSZip and FileSaver
// Add CDN scripts dynamically if not present
function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src='${src}']`)) return resolve();
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

const downloadAllBtn = document.getElementById('download-all');
if (downloadAllBtn) {
    downloadAllBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        downloadAllBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
        downloadAllBtn.disabled = true;
        try {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js');
            const zip = new JSZip();
            // List of files to include (filename in zip, file path)
            const files = [
                {name: 'Bharath Adhar.pdf', path: 'Bharath Adhar .pdf'},
                {name: '10th Marks Memo.pdf', path: '10 Marks.pdf'},
                {name: 'Intermediate Marks Memo.pdf', path: 'Inter Marks.pdf'},
                {name: 'Caste Certificate.pdf', path: 'Cast Certificate.pdf'},
                {name: 'Income Certificate.pdf', path: 'Income Certificate.pdf'},
                {name: 'Signature.pdf', path: 'Signature.pdf'},
                {name: 'PAN Card.pdf', path: 'PAN CARD BHARATH.pdf'},
                {name: 'Intermediate TC.pdf', path: 'Inter TC.pdf'}
            ];
            // Fetch and add each file to the zip
            for (const file of files) {
                const response = await fetch(file.path);
                if (!response.ok) throw new Error('Failed to fetch ' + file.name);
                const blob = await response.blob();
                zip.file(file.name, blob);
            }
            const content = await zip.generateAsync({type: 'blob'});
            saveAs(content, 'Bharath-Details.zip');
            downloadAllBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            setTimeout(() => {
                downloadAllBtn.innerHTML = '<i class="fas fa-download"></i> Download All';
                downloadAllBtn.disabled = false;
            }, 2000);
        } catch (err) {
            alert('Error preparing download: ' + err.message);
            downloadAllBtn.innerHTML = '<i class="fas fa-download"></i> Download All';
            downloadAllBtn.disabled = false;
        }
    });
} 