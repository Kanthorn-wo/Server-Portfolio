const User = require('../Models/Users')

exports.list = async (req, res) => {
  try {
    const user = await User.find({})
      .select('-password').exec()
    res.send(user)
  } catch (error) {
    console.log(error)
  }
}

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    // Check if the new name is unique
    const existingUser = await User.findOne({ name }).exec();

    if (existingUser && existingUser._id.toString() !== id) {
      // If another user with the same name exists (excluding the current user being updated)
      return res.status(400).json({
        error: 'Name must be unique',
      });
    }

    // If the name is unique, proceed with the update
    const updated = await User.findOneAndUpdate({ _id: id }, { name: name }, { new: true }).exec();

    res.json({
      message: 'Updated successfully',
      updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id
    console.log('id', id)
    const removed = await User.findOneAndDelete({ _id: id }).exec()
    res.json({
      massage: 'Deleted Success',
      removed
    })
  } catch (error) {
    console.log(error)
  }
}

exports.changeRole = async (req, res) => {
  try {
    const { id, role } = req.body
    const user = await User.findOneAndUpdate({ _id: id }, { role: role }, { new: true })
      .select('-password').exec()
    res.status(200).json({
      massage: `${user.name}:Role updated successfully`,
      user,
    });
    console.log(user)
    res.send(req.body)
  } catch (error) {
    console.log(error)
  }
}

exports.userActive = async (req, res) => {
  try {
    const { id, active } = req.body;
    const user = await User.findOneAndUpdate({ _id: id }, { active: active }, { new: true })
      .select('-password').exec()
    res.status(200).json({
      massage: `${user.name}:Active updated successfully`,
      user,
    });

  } catch (error) {
    console.log(error)
  }
}