<%-- 
    Document   : index
    Created on : 15/10/2015, 17:50:49
    Author     : Leonardo
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="refresh" content="1; url=${pageContext.request.contextPath}/views/home.jsp">
        <script type="text/javascript">
            window.location.href = "${pageContext.request.contextPath}/views/home.jsp"
        </script>
        <title>Page Redirection</title>
    </head>
</html>