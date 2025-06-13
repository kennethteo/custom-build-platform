docker run --rm --init \
  --name bytebase \
  --publish 8080:8080 --pull always \
  --volume ~/.bytebase/data:/var/opt/bytebase \
  bytebase/bytebase:3.6.2