import ldap
from confluence.api.rest import Confluence

# Thông tin máy chủ LDAP
LDAP_SERVER_ADDRESS = "ldap://[đã xoá URL không hợp lệ]"
LDAP_BASE_DN = "dc=example,dc=com"

# Tên người dùng và mật khẩu LDAP
LDAP_USERNAME = "cn=admin,dc=example,dc=com"
LDAP_PASSWORD = "password"

# Thông tin Confluence
CONFLUENCE_URL = "https://confluence.example.com"
CONFLUENCE_USERNAME = "username"
CONFLUENCE_PASSWORD = "password"

# Khởi tạo kết nối LDAP
ldap_connection = ldap.initialize(LDAP_SERVER_ADDRESS)
ldap_connection.protocol_version = ldap.VERSION3

# Gửi yêu cầu xác thực LDAP
try:
    ldap_connection.simple_bind_s(LDAP_USERNAME, LDAP_PASSWORD)
except ldap.LDAPError as error:
    print("Xác thực LDAP thất bại:", error.message)
    exit()

# Khởi tạo kết nối Confluence
confluence = Confluence(CONFLUENCE_URL, CONFLUENCE_USERNAME, CONFLUENCE_PASSWORD)

# Tìm kiếm bài viết có chứa từ khóa "python"
search_results = confluence.search(cql="content ~ 'python'")

# In tiêu đề bài viết
for page in search_results:
    print(page.title)

# Đóng kết nối LDAP
ldap_connection.unbind_s()
