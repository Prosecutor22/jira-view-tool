from flask import Flask, request
import json

app = Flask(__name__)

# Simulated data from Jira
jira_results = [
    {"id": 1, "title": "Jira Issue 1", "description": "Description for Jira Issue 1", "source": "Jira"},
    {"id": 2, "title": "Jira Issue 2", "description": "Description for Jira Issue 2", "source": "Jira"},
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
    query = request.args.get('query', '').lower()

    jira_results_filtered = jira_results
    confluence_results_filtered = confluence_results
    page_size = int(request.args.get('pageSize', 10))
    page_number = int(request.args.get('pageNumber', 1))

    paginated_jira_results = paginate_results(jira_results_filtered, page_size, page_number)
    paginated_confluence_results = paginate_results(confluence_results_filtered, page_size, page_number)

    res =  json.dumps({
        'jiraResults': paginated_jira_results,
        'confluenceResults': paginated_confluence_results
    })
    print(res)
    return res, 200

if __name__ == '__main__':
    app.run(port=3001, debug=True)