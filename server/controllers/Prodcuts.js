import Product from "../models/Product.js";

export const AddProduct = async (req, res) => {
  try {
    const { name, type, form, activeSubstance, description } = req.body;
    if (!name || !type || !form || !activeSubstance || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const createOne = new Product({
      name,
      type,
      form,
      activeSubstance,
      description,
    });
    await createOne.save();
    if (createOne) {
      return res.status(201).json({
        success: true,
        message: "Product created successfully. ",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const AllProducts = await Product.find();
    if (AllProducts) {
      return res.status(200).json({
        success: true,
        message: "All Product get successfully. ",
        data: AllProducts,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const getOneProduct = await Product.findById(id);
    if (getOneProduct) {
      return res.status(200).json({
        success: true,
        message: "All Product get successfully. ",
        data: getOneProduct,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, form, activeSubstance, description } = req.body;

    const editOneProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        type,
        form,
        activeSubstance,
        description,
      },
      { new: true }, // يُرجع المستند بعد التعديل في Mongoose
    );

    // 1. في حال عدم العثور على المنتج
    if (!editOneProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 2. في حال نجاح التعديل
    return res.status(200).json({
      success: true,
      message: "Product Updated successfully.",
      data: editOneProduct,
    });
  } catch (error) {
    // 3. إرجاع رسالة الخطأ كنص وليس كـ Object كامل
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteone = await Product.findByIdAndDelete(id);
    if (deleteone) {
      return res.status(200).json({
        success: true,
        message: "Product Deleted successfully. ",
        data: deleteone,
      });
    }
    if (!deleteone) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
