import promptSync from "prompt-sync";
const prompt = promptSync();

function getStudents(){
    const students=[];

    for (let i=0; i<5; i++){
        const name= prompt('Enter student name: ')
        const gender= prompt('Enter gender of the student: ');
        const age= Math.floor(Math.random() * (35 - 17 + 1)) + 17; // floor cuz we want int 
        const grade = Math.floor(Math.random() * 101);
        const student = {
            name,
            gender,
            age,
            grade,
        };
        students.push(student)
    }
    return students;
}

// const studentList = getStudents();
// console.log("Student details:", studentList);
let students = [];
students = getStudents();
console.log("Student details:", students);

// a. The youngest student in the class
const getYoungestStudent= (students)=> students.reduce((youngest, student) => (student.age < youngest.age ? student : youngest), students[0]);

// b. The oldest student in the class, same as the one above just > instead. 
const getOldestStudent= (students)=> students.reduce((oldest, student) => (student.age > oldest.age ? student : oldest), students[0]);

// c. The average student age in the class
const getAverageAge= (students)=> students.reduce((sum, student) => sum+student.age, 0) / students.length;

// d. The median student age in the class, sort first then find the mid if even divide by two of it's odd then no problem
const getMedianAge= (students)=> {
    const sortedAges= students.map(s=> s.age).sort((a,b) => a-b);
    const mid = Math.floor(sortedAges.length / 2);
    return sortedAges.length%2 !== 0 ? sortedAges[mid] : (sortedAges[mid-1]+sortedAges[mid])/2;
};

// e. The mean of the student grades
const getMeanGrade= (students)=> students.reduce((sum, student)=> sum+student.grade, 0)/students.length;

// f. The variance of the student grades
const getVarianceGrade=(students)=> {
    const mean = getMeanGrade(students);
    return students.reduce((sum, student)=> sum + Math.pow(student.grade-mean, 2), 0)/(students.length-1);
  };

  console.log("Youngest student:", getYoungestStudent(students));
  console.log("Oldest student:", getOldestStudent(students));
  console.log("Average age:", getAverageAge(students).toFixed(2));
  console.log("Median age:", getMedianAge(students));
  console.log("Mean grade:", getMeanGrade(students).toFixed(2));
  console.log("Variance of grades:", getVarianceGrade(students).toFixed(2));

// g. Get students by gender to return either male of female students.
const getStudentsByGender = (gender) => students.filter(student => student.gender.toLowerCase() === gender.toLowerCase());

// doest work. fixed! :) 
// h. Display the student information sorted in alphabetical order by name
const sortStudentsByName = () => [...students].sort((a, b) => a.name.localeCompare(b.name));

// i. Display the student information sorted in descending order by grade
const sortStudentsByGradeDesc= ()=> [...students].sort((a, b)=> b.grade-a.grade);

// j. Determine if there are any students with failing grades (below 60)
const hasFailingGrades= ()=> students.some(student=> student.grade<60);

//k. Find the student(s) with the highest grade
const findHighestGradeStudents= ()=> {
    const highestGrade = Math.max(...students.map(student => student.grade));
    return students.filter(student => student.grade===highestGrade);
}; 

// l. Find the student(s) with the highest grade among the female students
const findHighestGradeFemaleStudents=()=> {
    // first select the female students 
    const femaleStudents= students.filter(student => student.gender.toLowerCase()==="female" || student.gender.toLowerCase()==="f");
    const highestGrade= Math.max(...femaleStudents.map(student=> student.grade)); // same as findHighestGradeStudents just this time for female students only 
    return femaleStudents.filter(student=> student.grade===highestGrade);
};

// m. Find the average grade for male students
const averageGradeMaleStudents = () => {
    const maleStudents = students.filter(student => student.gender.toLowerCase() === "male" || student.gender.toLowerCase() === "m");
    return maleStudents.length ? maleStudents.reduce((sum, student) => sum + student.grade, 0)/maleStudents.length : 0;
};

// n. Display the student information with an additional property that indicates whether
// the student has a passing grade (60 or higher).
const passingGradeInfo=() => students.map(student=> ( {
    ...student, passing: student.grade>=60
}));

console.log("Male students:", getStudentsByGender("male"));
console.log("Students sorted by name:", sortStudentsByName());
console.log("Sorted by grade (dec):", sortStudentsByGradeDesc());
console.log("Any failing grades:", hasFailingGrades());
console.log("Highest grade gtudents:", findHighestGradeStudents());
console.log("Highest grade female students:", findHighestGradeFemaleStudents());
console.log("Average grade male students:", averageGradeMaleStudents());
console.log("Students with passing grade info:", passingGradeInfo());

// Question 2
const products = [
    {id: 1, name: 'Apple 14 Pro Max', price: 4500},
    {id: 2, name: 'iPad Pro 12.9-inch', price: 5600},
    {id: 3, name: 'Samsung Galaxy S14', price: 3900},
    {id: 4, name: 'Microsoft Surface Book 3', price: 6700},
    {id: 5, name: 'Sony PlayStation 5', price: 3500},
    {id: 6, name: 'Dell XPS 13', price: 4500},
    {id: 7, name: 'LG 65-inch OLED TV', price: 9800},
    {id: 8, name: 'Bose QuietComfort 35 II', price: 1800}
];

let cart = [];

// Menu
const menu =()=> {
    while (true){
        console.log("\nShopping app menu: ")
        console.log("1. Add product");
        console.log("2. Change quantity");
        console.log("3. Delete product");
        console.log("4. Display invoice");
        console.log("5. Exit");

        const choice = prompt("Enter your choice: ");
        switch (choice){
            case "1": addToCart(); 
            break;
            case "2": changeQuantity(); 
            break;
            case "3": deleteFromCart(); 
            break;
            case "4": displayInvoice(); 
            break;
            case "5": 
            return;
            default: console.log("Invalid choice. Try again.");
        }
    }
};

const displayProducts=() => {
    console.log("\nAvailable Products: ");
    products.forEach(product => console.log(`${product.id}. ${product.name} - ${product.price} QAR`));
};

// Option 1 – Add Item
const addToCart = () => {
    displayProducts();
    const productId = parseInt(prompt("Enter product ID to add: "));
    const quantity = parseInt(prompt("Enter quantity: "));

    const product = products.find(p => p.id === productId);
    if (!product) {
        console.log("Invalid product ID.");
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    console.log(`${product.name} added to cart.`);
};

// Option 2 – Change Quantity (modify print line so it prints the new #, updated quantity)
const changeQuantity = () => {
    console.log("\nYour Cart:");
    cart.forEach(item => console.log(`${item.id}. ${item.name} - ${item.quantity} pcs`));

    const productId = parseInt(prompt("Enter product ID to change quantity: "));
    const newQuantity = parseInt(prompt("Enter new quantity: "));

    const item = cart.find(item => item.id === productId);
    if (!item) {
        console.log("Item not found in cart.");
        return;
    }

    item.quantity = newQuantity;
    console.log(`Updated ${item.name} quantity to ${newQuantity}.`);
};

// Option 3 – Delete Item
const deleteFromCart = () => {
    console.log("\nYour Cart:");
    cart.forEach(item => console.log(`${item.id}. ${item.name} - ${item.quantity} pcs`));

    const productId = parseInt(prompt("Enter product ID to remove: "));

    const index = cart.findIndex(item => item.id === productId);
    if (index === -1) {
        console.log("Item not found in cart.");
        return;
    }

    console.log(`${cart[index].name} removed from cart.`);
    cart.splice(index, 1);
};

// Option 4 – Display Invoice
const displayInvoice = () => {
    console.log("\nYour Invoice:");
    let total = 0;

    if (cart.length === 0) {
        console.log("Your cart is empty.");
        return;
    }

    let mostExpensive = cart[0];
    let leastExpensive = cart[0];

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        if (itemTotal > mostExpensive.price * mostExpensive.quantity) mostExpensive = item;
        if (itemTotal < leastExpensive.price * leastExpensive.quantity) leastExpensive = item;

        console.log(`${item.name} - ${item.quantity} pcs - ${itemTotal} QAR`);
    });
    console.log(`\nTotal Price: ${total} QAR`);
    console.log(`Most Expensive: *${mostExpensive.name}*`);
    console.log(`Least Expensive: **${leastExpensive.name}**`);
};
menu();
export {addToCart, changeQuantity, deleteFromCart, displayInvoice, cart, products};





