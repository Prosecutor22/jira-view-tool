FROM python:3.10.12

COPY . .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

ENTRYPOINT [ "python", "app.py" ]