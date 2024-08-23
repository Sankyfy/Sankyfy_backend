
import bcrypt from 'bcrypt';
import User from '../models/User.Model.js';

// Signup user
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, error: 'Invalid password' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update user by ID
const updateUserById = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Fetch the user to compare the passwords
        const existingUser = await User.findById(req.params.id);

        if (!existingUser) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        if (password) {
            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (!isMatch) {
                req.body.password = await bcrypt.hash(password, 10);
            } else {
                // If passwords match, do not hash the new password (remove it from req.body)
                delete req.body.password;
            }
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateUserStatus = async (req, res) => {
    const { shopId, status } = req.body;
    //  console.log("Shop ==>",shopId, status )
    try {
        const shopData = await User.findById(shopId);
        console.log("ShopData ==>",shopData);
      const shop = await User.findByIdAndUpdate(
        shopId,
        { status },
        { new: true } // Return the updated document
      );
  
      if (!shop) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User status updated successfully', shop });
    } catch (error) {
      console.error('Error updating shop status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Delete user by ID
const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

 const updatePassword = async (req, res) => {
    const { email, previousPassword, newPassword } = req.body;
     console.log("I ma here ====>")
    try {
        const userArray = await User.find({email:email});
        const user = userArray[0] ;
        //  console.log("user ====>",user)
        if (!user) {
            
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(previousPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect previous password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};



// Other CRUD operations can be added similarly

export { signupUser, loginUser, getUserById,getAllUsers, updateUserById, deleteUserById,updateUserStatus,updatePassword };
