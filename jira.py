from flask import Flask, request, jsonify
from ldap3 import Connection
from jira.client import JIRA
import requests

app = Flask(__name__)

# Thông tin LDAP
LDAP_SERVER_ADDRESS = "ldap://[đã xoá URL không hợp lệ]"
LDAP_BASE_DN = "dc=example,dc=com"

# Thông tin Jira Enterprise
JIRA_URL = "https://jira.enterprise.example.com"
SSO_ENDPOINT = "https://jira.enterprise.example.com/sso/login"

# Tạo kết nối LDAP
ldap_connection = Connection(LDAP_SERVER_ADDRESS, user="cn=admin,dc=example,dc=com", password="password")

# Hàm xác thực
def authenticate(username, password):
    try:
        ldap_connection.bind(f"cn={username},{LDAP_BASE_DN}", password)
        return True
    except ldap3.core.exceptions.LDAPException:
        return False

# Hàm lấy token SSO
def get_sso_token(username, password):
    response = requests.post(
        SSO_ENDPOINT,
        data={"username": username, "password": password},
    )

    if response.status_code == 200:
        return response.json()["token"]

    return None

# Hàm tìm kiếm Jira Enterprise
def search_jira_enterprise(username, token, query):
    # Tạo đối tượng JIRA với token SSO
    jira = JIRA(
        username=username,
        password=token,
        url=JIRA_URL,
    )

    # Tìm kiếm ticket
    issues = jira.search_issues(query)

    return [issue.key for issue in issues]

# Trang đăng nhập
@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]

    if authenticate(username, password):
        token = get_sso_token(username, password)

        if token is not None:
            return jsonify({"success": True, "token": token})

    return jsonify({"error": "Invalid credentials"})

# Trang tìm kiếm
@app.route("/search", methods=["GET"])
def search():
    username = request.args["username"]
    token = request.args["token"]
    query = request.args["query"]

    tickets = search_jira_enterprise(username, token, query)

    return jsonify({"tickets": tickets})

if __name__ == "__main__":
    app.run()
