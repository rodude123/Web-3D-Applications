let navLink =  document.querySelectorAll(".navLink");

document.querySelector("#drinksMenu").addEventListener("click", e => 
{
    e.target.classList.toggle("active")
});

document.querySelector("#burger").addEventListener("click", () => 
{
    document.querySelector("#navLinks").classList.toggle("shown");
    document.querySelector("#drinksMenu").classList.remove("active");
});

document.body.addEventListener("click", e =>
{
    if (e.target !== document.querySelector("#drinksMenu"))
    {
        document.querySelector("#drinksMenu").classList.remove("active");
    }
});