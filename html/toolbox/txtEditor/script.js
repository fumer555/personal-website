document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        document.getElementById('textContainer').innerHTML = text.replace(/({[^}]+})/g, '<span class="highlight">$1</span>');
    };
    reader.readAsText(file);
});

document.getElementById('textContainer').addEventListener('keydown', function(e) {
    if (e.metaKey && e.key === 'i') {
        e.preventDefault();
        document.execCommand('styleWithCSS', false, true);
        document.execCommand('foreColor', false, 'yellow');
        document.execCommand('insertText', false, `{${window.getSelection().toString()}}`);
    }
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    let textContent = document.getElementById('textContainer').innerHTML;
    textContent = textContent.replace(/<span class="highlight">({[^}]+})<\/span>/g, '$1'); // 保留大括号内容
    textContent = textContent.replace(/<[^>]*>/g, ''); // 移除所有HTML标签
    const blob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'modified_text.txt';
    link.click();
});
