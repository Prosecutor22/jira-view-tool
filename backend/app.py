from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
# Simulated data from Jira
jira_results = [
  {
    "key": "ISSUE-1",
    "description": "Fix authentication bug",
    "assignee": "John Doe",
    "reporter": "Alice Smith",
    "link": "https://example.com/issue-1"
  },
  {
    "key": "ISSUE-2",
    "description": "Implement new feature",
    "assignee": "Jane Doe",
    "reporter": "Bob Johnson",
    "link": "https://example.com/issue-2"
  },
  {
    "key": "ISSUE-3",
    "description": "Optimize database queries",
    "assignee": "Sam Brown",
    "reporter": "Eva White",
    "link": "https://example.com/issue-3"
  },
  {
    "key": "ISSUE-4",
    "description": "Update user interface",
    "assignee": "Chris Green",
    "reporter": "Olivia Black",
    "link": "https://example.com/issue-4"
  },
  {
    "key": "ISSUE-5",
    "description": "Resolve performance issue",
    "assignee": "Mia Turner",
    "reporter": "Charlie Davis",
    "link": "https://example.com/issue-5"
  },
  {
    "key": "ISSUE-6",
    "description": "Create API documentation",
    "assignee": "David Lee",
    "reporter": "Sophia Wilson",
    "link": "https://example.com/issue-6"
  },
  {
    "key": "ISSUE-7",
    "description": "Fix broken links on website",
    "assignee": "Emma Miller",
    "reporter": "James Johnson",
    "link": "https://example.com/issue-7"
  },
  {
    "key": "ISSUE-8",
    "description": "Add multi-language support",
    "assignee": "Noah White",
    "reporter": "Ava Thompson",
    "link": "https://example.com/issue-8"
  },
  {
    "key": "ISSUE-9",
    "description": "Upgrade server infrastructure",
    "assignee": "Ethan Harris",
    "reporter": "Grace Turner",
    "link": "https://example.com/issue-9"
  },
  {
    "key": "ISSUE-10",
    "description": "Implement search functionality",
    "assignee": "Aiden Martinez",
    "reporter": "Lily Davis",
    "link": "https://example.com/issue-10"
  },
  {
    "key": "ISSUE-11",
    "description": "Fix compatibility issues",
    "assignee": "Zoe Turner",
    "reporter": "Lucas Baker",
    "link": "https://example.com/issue-11"
  },
  {
    "key": "ISSUE-12",
    "description": "Improve error handling",
    "assignee": "Elijah White",
    "reporter": "Hannah Brown",
    "link": "https://example.com/issue-12"
  },
  {
    "key": "ISSUE-13",
    "description": "Enhance user onboarding",
    "assignee": "Leah Miller",
    "reporter": "Benjamin Turner",
    "link": "https://example.com/issue-13"
  },
  {
    "key": "ISSUE-14",
    "description": "Fix broken integration",
    "assignee": "Logan Harris",
    "reporter": "Stella Wilson",
    "link": "https://example.com/issue-14"
  },
  {
    "key": "ISSUE-15",
    "description": "Implement analytics dashboard",
    "assignee": "Mateo Davis",
    "reporter": "Victoria Thompson",
    "link": "https://example.com/issue-15"
  },
  {
    "key": "ISSUE-16",
    "description": "Update third-party libraries",
    "assignee": "Penelope Black",
    "reporter": "Nathan Baker",
    "link": "https://example.com/issue-16"
  },
  {
    "key": "ISSUE-17",
    "description": "Fix security vulnerability",
    "assignee": "Gabriel White",
    "reporter": "Mila Turner",
    "link": "https://example.com/issue-17"
  },
  {
    "key": "ISSUE-18",
    "description": "Implement dark mode",
    "assignee": "Isaac Harris",
    "reporter": "Zara Wilson",
    "link": "https://example.com/issue-18"
  },
  {
    "key": "ISSUE-19",
    "description": "Optimize image loading",
    "assignee": "Nora Davis",
    "reporter": "Eli Turner",
    "link": "https://example.com/issue-19"
  },
  {
    "key": "ISSUE-20",
    "description": "Fix broken notifications",
    "assignee": "Harrison Wilson",
    "reporter": "Scarlett Black",
    "link": "https://example.com/issue-20"
  }
]


# Simulated data from Confluence
confluence_results = [
    {"id": 3, "title": "Confluence Page 1", "description": "Description for Confluence Page 1", "source": "Confluence"},
    {"id": 4, "title": "Confluence Page 2", "description": "Description for Confluence Page 2", "source": "Confluence"},
]

# Pagination helper function
def paginate_results(results, page_size, page_number):
    start_index = (page_number - 1) * page_size
    end_index = start_index + page_size
    return results[start_index:end_index]

@app.route('/search', methods=['GET'])
def search_content():

    res =  json.dumps({
        'jiraData': jira_results,
        'confluenceData': confluence_results
    })
    print(res)
    return res, 200

if __name__ == '__main__':
    app.run(port=3001, debug=True)