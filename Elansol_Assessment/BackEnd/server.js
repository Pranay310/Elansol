const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());

app.options('*', cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "elansol_contact_manager",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        return;
    }
    console.log("Connected to database.");
});


app.get("/", (req, res) => {
    const sql = "SELECT * FROM contacts";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.json(err);
        }
        res.json(data);
    });
});

app.get("/user", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching user:", err);
            return res.json(err);
        }
        res.json(data);
    });
});

app.post("/create", (req, res) => {
    console.log("Incoming data:", req.body);

    const sql = "INSERT INTO users (`Username`, `Password`) VALUES (?, ?)";
    const values = [req.body.name, req.body.pass];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json(err);
        }
        res.json(data);
    });
});

app.post("/contact", (req, res) => {
    console.log("Incoming data:", req.body);

    const sql = "INSERT INTO contacts (`UserID`, `Name`, `Email`, `Phone`) VALUES (?, ?, ?, ?)";
    const values = [req.body.userId, req.body.name, req.body.email, req.body.phone];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json(err);
        }
        res.json(data);
    });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE Username = ? AND Password = ?";
    db.query(sql, [username, password], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }

        if (data.length > 0) {
            res.json({ success: true, message: "Login successful" });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    });
});


app.delete("/contact/:email", (req, res) => {
    const email = req.params.email;

    const sql = "DELETE FROM contacts WHERE Email = ?";
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("Error deleting contact:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
        if (result.affectedRows > 0) {
            res.json({ success: true, message: `Contact with email ${email} deleted successfully` });
        } else {
            res.status(404).json({ success: false, message: `Contact with email ${email} not found` });
        }
    });
});



app.listen(8081, () => {
    console.log("Listening");
});
