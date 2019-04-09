package utils;

import com.google.gson.Gson;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ResponseJSON {
    private ResponseJSON() {}
    public static void make(HttpServletRequest request, HttpServletResponse response, Object o) throws IOException {
        String json = new Gson().toJson(o);
        response.setContentType("application/json");
        response.getWriter().write(json);
    }
}