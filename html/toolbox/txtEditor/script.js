let originalFileName = '';

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    originalFileName = file.name;
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
        const selection = window.getSelection();
        const selectedText = selection.toString();
        const range = selection.getRangeAt(0);
        const container = document.getElementById('textContainer');
        const containerText = container.innerHTML;

        if (/{[^}]+}/.test(selectedText)) {
            // 如果文本已经被括号包围，去掉括号
            const newText = selectedText.replace(/{|}/g, '');
            document.execCommand('insertText', false, newText);
        } else {
            // 否则添加括号和高亮
            document.execCommand('insertText', false, `{${selectedText}}`);
            const highlightedText = document.createElement('span');
            highlightedText.className = 'highlight';
            highlightedText.textContent = `{${selectedText}}`;
            range.deleteContents();
            range.insertNode(highlightedText);
        }
    }
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    let textContent = document.getElementById('textContainer').innerHTML;
    textContent = textContent.replace(/<span class="highlight">({[^}]+})<\/span>/g, '$1'); // 保留大括号内容
    textContent = textContent.replace(/<[^>]*>/g, ''); // 移除所有HTML标签
    const blob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    const fileNameParts = originalFileName.split('.');
    const fileName = fileNameParts.slice(0, -1).join('.') + '_flag.' + fileNameParts.slice(-1);
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
});
