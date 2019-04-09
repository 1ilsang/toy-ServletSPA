package service;

import dao.BoardDAOImpl;
import domain.Board;
import utils.ResponseJSON;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;

public class BoardService {
    private BoardService() {
    }

    private static BoardService boardService = new BoardService();

    public static BoardService getInstance() {
        return boardService;
    }

    private BoardDAOImpl boardDAO = BoardDAOImpl.getInstance();

    public void getAll(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ResponseJSON.make(request, response, boardDAO.getAll());
    }
    public void get(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String cmd = request.getParameter("str");
        ResponseJSON.make(request, response, boardDAO.getContainString(cmd));
    }
    public void insert(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        // FIXME 귀찮아서 title, desc 를 id, pw 로 통일해놨는데 이 부분 오해의 여지가 있음.
        String title = request.getParameter("id");
        String desc = request.getParameter("pw");
        if(session == null || title == null || desc == null) {
            response.setStatus(500);
            return;
        }
        Board board = new Board();
        board.setId(session.getId());
        board.setTitle(title);
        board.setDesc(desc);
        Date date = new Date();
        board.setDate(date.getTime() / 1000);
        boardDAO.insert(board);
    }
    public void remove(HttpServletRequest request, HttpServletResponse response) {
        if(boardDAO.remove(Integer.parseInt(request.getParameter("id")))) return;
        response.setStatus(500);
    }
}