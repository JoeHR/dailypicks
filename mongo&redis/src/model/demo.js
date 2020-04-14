import User from './test';

// 增
const user = {
  name: 'brain',
  age: 30,
  email: 'brain@tomic.com',
};

const insertMethods = async () => {
  const data = new User(user);
  const result = await data.save();
  console.log(result);
};

// 查
const findMethods = async () => {
  const result = await User.find();
  console.log(result);
};

// 改
const updatedMethods = async () => {
  const result = await User.updateOne(
    { name: 'brain' },
    {
      email: 'imooc@tomic.com',
    }
  );
  console.log(result);
};

//删
const deleteMethods = async () => {
  const result = await User.deleteOne({ name: 'brain' });
  console.log(result);
};

// updatedMethods();
deleteMethods();
