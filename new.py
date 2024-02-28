server_uri = "ldap://ldap.example.com:389"
base_dn = "dc=example,dc=com"
username = "cn=admin,dc=example,dc=com"
password = "secret"

username = "johndoe"
filter = "(&(uid={})(objectClass=person))".format(username)
attrs = ["dn", "userPassword"]

conn = ldap.initialize(server_uri)
conn.simple_bind_s(username, password)

result = conn.search_s(base_dn, ldap.SCOPE_SUBTREE, filter, attrs)

if result:
    dn, user_info = result[0]
    password = user_info["userPassword"][0].decode("utf-8")

    gh = github3.login(username, password, enterprise_url="https://ghe.example.com")

    if gh.is_authenticated():
        print("Xác thực thành công!")
    else:
        print("Xác thực thất bại!")
else:
    print("Tài khoản Github Enterprise không tồn tại!")
