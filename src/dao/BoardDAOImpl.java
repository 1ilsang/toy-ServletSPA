package dao;

import domain.Board;

import java.util.LinkedList;
import java.util.List;

public class BoardDAOImpl implements BoardDAO {
    private BoardDAOImpl() {
    }

    private static BoardDAOImpl boardDAO = new BoardDAOImpl();

    public static BoardDAOImpl getInstance() {
        return boardDAO;
    }

    // TODO list -> DB
    private List<Board> list = new LinkedList<>();
    private static int SEQ = 0;

    public List<Board> getAll() {
        return list;
    }

    public Board getSeq(int seq) {
        for (Board e : list) if (e.getSeq() == seq) return e;
        return null;
    }

    public List<Board> getContainString(String str) {
        List<Board> ret = new LinkedList<>();
        for (Board e : list)
            if (e.getId().contains(str) || e.getDesc().contains(str) || e.getTitle().contains(str)) ret.add(e);
        return ret;
    }

    public boolean insert(Board board) {
        board.setSeq(SEQ++);
        list.add(board);
        return true;
    }

    public boolean remove(int seq) {
        for (Board e : list)
            if (e.getSeq() == seq) {
                list.remove(e);
                return true;
            }
        return false;
    }
}