<%--
  Created by IntelliJ IDEA.
  User: jianrongsun
  Date: 17-5-25
  Time: 下午4:53
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="common/tag.jsp" %>
<%@taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>秒杀列表</title>
    <%@include file="common/head.jsp" %>
</head>
<body>

<div class="container">
    <div class="panel panel-default">
        <div class="panel-heading text-center">
            <h2>秒杀列表</h2>
        </div>
    </div>
    <div class="panel-body">
        <div class="table table-hover">
            <thead>
            <tr>
                <td>名称</td>
                <td>库存</td>
                <td>开始时间</td>
                <td>结束时间</td>
                <td>创建时间</td>
                <td>详情页</td>
            </tr>
            </thead>
            <tbody>
            <c:forEach items="${list}" var="sk">
                <tr>
                    <td>${sk.name}</td>
                    <td>${sk.number}</td>
                        <%-- <td><fmt:formatDate value="${sk.startTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
                         <td><fmt:formatDate value="${sk.endTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
                         <td><fmt:formatDate value="${sk.createTIme}" pattern="yyyy-MM-dd HH:mm:ss"/></td>--%>

                    <td><tags:localDataTime dateTime="${sk.startTime}"/></td>
                    <td><tags:localDataTime dateTime="${sk.endTime}"/></td>
                    <td><tags:localDataTime dateTime="${sk.createTIme}"/></td>
                    <td><a class="btn btn-info" href="/seckill/${sk.seckillId}/detail" target="_blank">详情</a></td>
                </tr>
            </c:forEach>
            </tbody>
        </div>
    </div>
</div>
</body>
<script src="${pageContext.request.contextPath}/resources/plugins/jquery.js"></script>
<script src="${pageContext.request.contextPath}/resources/plugins/bootstrap-3.3.0/js/bootstrap.min.js"></script>
</html>









