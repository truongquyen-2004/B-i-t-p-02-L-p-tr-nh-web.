document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const q = document.getElementById('query').value.trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "<p>🔍 Đang tìm kiếm...</p>";

    try {
        const response = await fetch(`http://127.0.0.1:1880/timkiem?q=${q}`);
        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            resultsDiv.innerHTML = "<p>❌ Không tìm thấy món nào phù hợp!</p>";
            return;
        }

        // Hiển thị kết quả
        resultsDiv.innerHTML = data.map(item => `
            <div class="card">
                <h3>${item.TenMonAn}</h3>
                <p><b>Giá:</b> ${item.Gia.toLocaleString()} đ</p>
            </div>
        `).join('');
    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = "<p>⚠️ Lỗi khi kết nối API Node-RED!</p>";
    }
});
