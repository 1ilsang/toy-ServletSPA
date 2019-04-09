package utils;

import java.io.Serializable;
import java.util.List;


// c10n 생성자 빌더를 해야할까?
public class User implements Serializable {
    private String uid, pw, name, addr, phoneNumber;
    private List<String> allergies;

    public User() {

    }

    public User(String uid, String pw, String name, String addr, String phoneNumber, List<String> allergies) {
        this.uid = uid;
        this.pw = pw;
        this.name = name;
        this.addr = addr;
        this.phoneNumber = phoneNumber;
        this.allergies = allergies;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        this.pw = pw;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<String> getAllergie() {
        return allergies;
    }

    public void setAllergie(List<String> allergies) {
        this.allergies = allergies;
    }
}