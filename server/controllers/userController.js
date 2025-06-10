const { UserMaintenance } = require("../models/index");
const bcrypt = require("bcryptjs");

const userMaintenanceController = {
  // ✅ Create a new UserMaintenance entry (Registration)
  async createUserMaintenance(req, res) {
    try {
      console.log("REQ.BODY:", req.body);

      const { institute_name, email, password, registered_date, institute_address, created_by } = req.body;

      // Validate required fields
      if (!institute_name || !email || !password || !institute_address || !created_by) {
        return res.status(400).json({ 
          error: "Missing required fields: institute_name, email, password, institute_address, created_by are required" 
        });
      }

      // ✅ Hash the password before storing
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const userMaintenance = await UserMaintenance.create({
        institute_name,
        email,
        password: hashedPassword, // Store hashed password
        registered_date: registered_date || new Date(),
        institute_address,
        created_by,
      });

      // Don't return the password in the response
      const { password: _, ...userWithoutPassword } = userMaintenance.toJSON();
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Error creating User Maintenance entry:", error);
      
      // Handle unique constraint violation (duplicate email)
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Email already exists" });
      }
      
      res.status(400).json({ error: error.message });
    }
  },

  // ✅ Get all UserMaintenance entries
  async getAllUserMaintenances(req, res) {
    try {
      const userMaintenances = await UserMaintenance.findAll({
        attributes: { exclude: ['password'] }, // Don't return passwords
        order: [['created_at', 'DESC']]
      });
      res.json(userMaintenances);
    } catch (error) {
      console.error("Error fetching User Maintenance entries:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // ✅ Get a specific UserMaintenance entry by ID
  async getUserMaintenance(req, res) {
    try {
      const userMaintenance = await UserMaintenance.findByPk(req.params.id, {
        attributes: { exclude: ['password'] } // Don't return password
      });
      
      if (!userMaintenance) {
        return res.status(404).json({ error: "User Maintenance entry not found" });
      }
      
      res.json(userMaintenance);
    } catch (error) {
      console.error("Error fetching User Maintenance entry:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // ✅ Update UserMaintenance entry
  async updateUserMaintenance(req, res) {
    try {
      const userMaintenance = await UserMaintenance.findByPk(req.params.id);
      if (!userMaintenance) {
        return res.status(404).json({ error: "User Maintenance entry not found" });
      }

      const updatedData = {
        institute_name: req.body.institute_name || userMaintenance.institute_name,
        email: req.body.email || userMaintenance.email,
        registered_date: req.body.registered_date || userMaintenance.registered_date,
        institute_address: req.body.institute_address || userMaintenance.institute_address,
        updated_by: req.body.updated_by || userMaintenance.updated_by,
      };

      // ✅ Hash password if it's being updated
      if (req.body.password) {
        const saltRounds = 10;
        updatedData.password = await bcrypt.hash(req.body.password, saltRounds);
      }

      await userMaintenance.update(updatedData);
      
      // Don't return the password in the response
      const { password: _, ...userWithoutPassword } = userMaintenance.toJSON();
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error updating User Maintenance entry:", error);
      
      // Handle unique constraint violation (duplicate email)
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Email already exists" });
      }
      
      res.status(400).json({ error: error.message });
    }
  },

  // ✅ Delete UserMaintenance entry by ID
  async deleteUserMaintenance(req, res) {
    try {
      const userMaintenance = await UserMaintenance.findByPk(req.params.id);
      if (!userMaintenance) {
        return res.status(404).json({ error: "User Maintenance entry not found" });
      }
      
      await userMaintenance.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting User Maintenance entry:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // ✅ Login authentication with debug logging
  async login(req, res) {
    try {
      console.log("=== LOGIN ATTEMPT ===");
      console.log("Request body:", req.body);
      
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        console.log("❌ Missing email or password");
        return res.status(400).json({ message: "Email and password are required" });
      }

      console.log("🔍 Looking for user with email:", email);
      const user = await UserMaintenance.findOne({ where: { email } });
      
      if (!user) {
        console.log("❌ User not found with email:", email);
        return res.status(401).json({ message: "Invalid email or password" });
      }

      console.log("✅ User found:", {
        id: user.id,
        email: user.email,
        institute_name: user.institute_name,
        passwordHash: user.password ? "Present" : "Missing"
      });

      console.log("🔐 Comparing passwords...");
      console.log("Plain password:", password);
      console.log("Stored hash:", user.password);
      
      let isMatch = false;
      
      try {
        // Try bcrypt comparison first
        isMatch = await bcrypt.compare(password, user.password);
        console.log("Bcrypt comparison result:", isMatch);
      } catch (err) {
        console.log("Bcrypt comparison failed:", err.message);
        // If bcrypt fails, try plain text comparison (for existing plain text passwords)
        isMatch = password === user.password;
        console.log("Plain text comparison result:", isMatch);
      }
      
      if (!isMatch) {
        console.log("❌ Password mismatch");
        return res.status(401).json({ message: "Invalid email or password" });
      }

      console.log("✅ Login successful");
      return res.status(200).json({
        message: "Login successful",
        token: "mocked-token", // replace with JWT if needed
        user: {
          id: user.id,
          institute_name: user.institute_name,
          email: user.email,
          institute_address: user.institute_address,
        },
      });
    } catch (error) {
      console.error("❌ Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = userMaintenanceController;