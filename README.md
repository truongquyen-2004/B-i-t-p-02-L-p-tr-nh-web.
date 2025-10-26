#Bài tập 02: Lập trình web.
==============================
NGÀY GIAO: 19/10/2025
==============================
DEADLINE: 26/10/2025
==============================
1. Sử dụng github để ghi lại quá trình làm, tạo repo mới, để truy cập public, edit file `readme.md`:
   chụp ảnh màn hình (CTRL+Prtsc) lúc đang làm, paste vào file `readme.md`, thêm mô tả cho ảnh.
2. NỘI DUNG BÀI TẬP:
2.1. Cài đặt Apache web server:
- Vô hiệu hoá IIS: nếu iis đang chạy thì mở cmd quyền admin để chạy lệnh: rr
- Download apache server, giải nén ra ổ D, cấu hình các file:
  + D:\Apache24\conf\httpd.conf
  + D:Apache24\conf\extra\httpd-vhosts.conf
  để tạo website với domain: fullname.com
  code web sẽ đặt tại thư mục: `D:\Apache24\fullname` (fullname ko dấu, liền nhau)
- sử dụng file `c:\WINDOWS\SYSTEM32\Drivers\etc\hosts` để fake ip 127.0.0.1 cho domain này
  ví dụ sv tên là: `Đỗ Duy Cốp` thì tạo website với domain là fullname ko dấu, liền nhau: `doduycop.com`
- thao tác dòng lệnh trên file `D:\Apache24\bin\httpd.exe` với các tham số `-k install` và `-k start` để cài đặt và khởi động web server apache.
  ### kết quả:
  <img width="1895" height="1079" alt="Screenshot 2025-10-25 152921" src="https://github.com/user-attachments/assets/cf627cf0-e9c2-43d4-a062-d1c9dac03099" />

2.2. Cài đặt nodejs và nodered => Dùng làm backend:
- Cài đặt nodejs:
  + download file `https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi`  (đây ko phải bản mới nhất, nhưng ổn định)
  + cài đặt vào thư mục `D:\nodejs`
- Cài đặt nodered:
  + chạy cmd, vào thư mục `D:\nodejs`, chạy lệnh `npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"`
  + download file: https://nssm.cc/release/nssm-2.24.zip
    giải nén được file nssm.exe
    copy nssm.exe vào thư mục `D:\nodejs\nodered\`
  + tạo file "D:\nodejs\nodered\run-nodered.cmd" với nội dung (5 dòng sau):
@echo off
REM fix path
set PATH=D:\nodejs;%PATH%
REM Run Node-RED
node "D:\nodejs\nodered\node_modules\node-red\red.js" -u "D:\nodejs\nodered\work" %*
  + mở cmd, chuyển đến thư mục: `D:\nodejs\nodered`
  + cài đặt service `a1-nodered` bằng lệnh: nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd"
  + chạy service `a1-nodered` bằng lệnh: `nssm start a1-nodered`
### Kết quả:
<img width="1893" height="1079" alt="Screenshot 2025-10-25 162742" src="https://github.com/user-attachments/assets/327bdc12-4ea6-4559-bfee-f6790997a331" />
2.3. Tạo csdl tuỳ ý trên mssql (sql server 2022), nhớ các thông số kết nối: ip, port, username, password, db_name, table_name
### kết quả
<img width="1919" height="1078" alt="image" src="https://github.com/user-attachments/assets/fe6a9d9a-0d53-4e2d-9119-c5ca8ed9b20a" />
<img width="564" height="668" alt="image" src="https://github.com/user-attachments/assets/4b60e98c-d5e8-444d-9aae-48e2ad54e096" />

2.4. Cài đặt thư viện trên nodered:
- truy cập giao diện nodered bằng url: http://localhost:1880
- cài đặt các thư viện: node-red-contrib-mssql-plus, node-red-node-mysql, node-red-contrib-telegrambot, node-red-contrib-moment, node-red-contrib-influxdb, node-red-contrib-duckdns, node-red-contrib-cron-plus
- Sửa file `D:\nodejs\nodered\work\settings.js` : 
  tìm đến chỗ adminAuth, bỏ comment # ở đầu dòng (8 dòng), thay chuỗi mã hoá mật khẩu bằng chuỗi mới
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "chuỗi_mã_hoá_mật_khẩu",
            permissions: "*"
        }]
    },   
   với mã hoá mật khẩu có thể thiết lập bằng tool: https://tms.tnut.edu.vn/pw.php
- chạy lại nodered bằng cách: mở cmd, vào thư mục `D:\nodejs\nodered` và chạy lệnh `nssm restart a1-nodered`
  khi đó nodered sẽ yêu cầu nhập mật khẩu mới vào được giao diện cho admin tại: http://localhost:1880
  ### kết quả:
  <img width="1914" height="1075" alt="Screenshot 2025-10-25 164814" src="https://github.com/user-attachments/assets/cae7d270-f065-475a-855a-aa56670aa59e" />
  <img width="1911" height="1079" alt="Screenshot 2025-10-26 154207" src="https://github.com/user-attachments/assets/13613a86-4ee9-45f1-89c8-abf458cad549" />
  <img width="1919" height="1079" alt="Screenshot 2025-10-26 154213" src="https://github.com/user-attachments/assets/513cfdda-6f1e-4e2a-9f05-b3afdbcaa8d4" />
2.5. tạo api back-end bằng nodered:
- tại flow1 trên nodered, sử dụng node `http in` và `http response` để tạo api
- thêm node `MSSQL` để truy vấn tới cơ sở dữ liệu
- logic flow sẽ gồm 4 node theo thứ tự sau (thứ tự nối dây): 
  1. http in  : dùng GET cho đơn giản, URL đặt tuỳ ý, ví dụ: /timkiem
  2. function : để tiền xử lý dữ liệu gửi đến
  3. MSSQL: để truy vấn dữ liệu tới CSDL, nhận tham số từ node tiền xử lý
  4. http response: để phản hồi dữ liệu về client: Status Code=200, Header add : Content-Type = application/json
  có thể thêm node `debug` để quan sát giá trị trung gian.
- test api thông qua trình duyệt, ví dụ: http://localhost:1880/timkiem?q=thị
  ### Kết quả:
  <img width="1916" height="1078" alt="Screenshot 2025-10-26 155322" src="https://github.com/user-attachments/assets/3717000f-40bc-46f5-81b7-134929e5febf" />
  <img width="1919" height="1079" alt="Screenshot 2025-10-26 155329" src="https://github.com/user-attachments/assets/aae8e5eb-bc57-4a90-911b-67425a80080a" />
2.6. Tạo giao diện front-end:
- html form gồm các file : index.html, fullname.js, fullname.css
  cả 3 file này đặt trong thư mục: `D:\Apache24\fullname`
  nhớ thay fullname là tên của bạn, viết liền, ko dấu, chữ thường, vd tên là Đỗ Duy Cốp thì fullname là `doduycop`
  khi đó 3 file sẽ là: index.html, doduycop.js và doduycop.css
- index.html và fullname.css: trang trí tuỳ ý, có dấu ấn cá nhân, có form nhập được thông tin.
- fullname.js: lấy dữ liệu trên form, gửi đến api nodered đã làm ở bước 2.5, nhận về json, dùng json trả về để tạo giao diện phù hợp với kết quả truy vấn của bạn.
  ### Kết quả:
  <img width="1205" height="583" alt="Screenshot 2025-10-26 155540" src="https://github.com/user-attachments/assets/8d43a750-767a-4d62-95ed-68e6f7b37017" />
  <img width="1237" height="559" alt="Screenshot 2025-10-26 155554" src="https://github.com/user-attachments/assets/525c9764-1de4-41af-bc05-3da7403a835a" />
  <img width="1910" height="1073" alt="Screenshot 2025-10-26 151951" src="https://github.com/user-attachments/assets/bef2e915-066b-4815-87a3-f5bd911792e4" />
  <img width="1912" height="1071" alt="Screenshot 2025-10-26 152006" src="https://github.com/user-attachments/assets/c36aded5-318b-41fa-8a3d-f15bc5b5a4da" />
2.7. Nhận xét bài làm của mình:
- đã hiểu quá trình cài đặt các phần mềm và các thư viện như nào?
- đã hiểu cách sử dụng nodered để tạo api back-end như nào?
- đã hiểu cách frond-end tương tác với back-end ra sao?
  ### EM trả lời:
 ##### Quá trình cài đặt phần mềm và các thư viện:
- Trong quá trình cài đặt, ban đầu mình gặp chút khó khăn khi cấu hình các phần mềm như Node.js, Node-RED và một số thư viện liên quan. Tuy nhiên, sau khi hiểu rõ chức năng của từng phần và làm theo hướng dẫn từng bước, mình đã nắm được cách cài đặt đúng trình tự. Mình hiểu được tại sao cần cài Node.js trước để Node-RED có thể chạy, cũng như cách thêm node mới trong Node-RED để mở rộng chức năng. Ngoài ra, mình cũng biết cách kiểm tra lỗi khi cài đặt và cách khắc phục bằng cách gỡ và cài lại đúng phiên bản.

- Cách sử dụng Node-RED để tạo API Back-End:
Sau khi cài đặt thành công, mình bắt đầu làm quen với giao diện của Node-RED. Mình đã hiểu cách tạo luồng xử lý (flow) bằng cách kéo–thả các node như http in, function, http response để tạo ra một API đơn giản. Mình biết cách xử lý dữ liệu từ client gửi lên, thao tác với dữ liệu trong node function, rồi trả kết quả về. Ngoài ra, mình cũng hiểu cách lưu flow, deploy lại khi chỉnh sửa, và kiểm tra kết quả trực tiếp bằng trình duyệt hoặc Postman. Nhờ đó mình hiểu được quy trình tạo một API hoạt động thật sự mà không cần viết code quá nhiều.

- Cách front-end tương tác với back-end:
Phần này giúp mình hiểu rõ mối liên hệ giữa hai phần của ứng dụng. Từ front-end (file HTML và JS), mình biết cách gửi yêu cầu đến API backend thông qua phương thức fetch() hoặc form submit. Khi backend Node-RED nhận request, xử lý rồi trả dữ liệu về, front-end sẽ hiển thị kết quả ra giao diện. Mình đã thử kiểm tra bằng tab Network trong trình duyệt để xem dữ liệu đi qua lại như thế nào, từ đó hiểu rõ cơ chế hoạt động của ứng dụng web. Nhờ đó mình thấy được sự kết nối giữa giao diện người dùng và phần xử lý phía server.

    ==============================
TIÊU CHÍ CHẤM ĐIỂM:
1. y/c bắt buộc về thời gian: ko quá Deadline, quá: 0 điểm (ko có ngoại lệ)
2. cài đặt được apache và nodejs và nodered: 1đ
3. cài đặt được các thư viện của nodered: 1đ
4. nhập dữ liệu demo vào sql-server: 1đ
5. tạo được back-end api trên nodered, test qua url thành công: 1đ
6. tạo được front-end html css js, gọi được api, hiển thị kq: 1đ
7. trình bày độ hiểu về toàn bộ quá trình (mục 2.7): 5đ
==============================
GHI CHÚ:
1. yêu cầu trên cài đặt trên ổ D, nếu máy ko có ổ D có thể linh hoạt chuyển sang ổ khác, path khác.
2. có thể thực hiện trực tiếp trên máy tính windows, hoặc máy ảo
3. vì csdl là tuỳ ý: sv cần mô tả rõ db chứa dữ liệu gì, nhập nhiều dữ liệu test có nghĩa, json trả về sẽ có dạng như nào cũng cần mô tả rõ.
4. có thể xây dựng nhiều API cùng cơ chế, khác tính năng: như tìm kiếm, thêm, sửa, xoá dữ liệu trong DB.
5. bài làm phải có dấu ấn cá nhân, nghiêm cấm mọi hình thức sao chép, gian lận (sẽ cấm thi nếu bị phát hiện gian lận).
6. bài tập thực làm sẽ tốn nhiều thời gian, sv cần chứng minh quá trình làm: save file `readme.md` mỗi khoảng 15-30 phút làm : lịch sử sửa đổi sẽ thấy quá trình làm này!
7. nhắc nhẹ: github ko fake datetime được.
8. sv được sử dụng AI để tham khảo.
==============================
DEADLINE: 26/10/2025
==============================
./. 
