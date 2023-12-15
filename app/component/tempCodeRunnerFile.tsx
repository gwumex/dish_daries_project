  const scrollItem = (direction) => {
    const currentElement = document.getElementById(item._id);
    console.log("Current Element:", currentElement);
    console.log("Direction:", direction);
  
    if (currentElement) {
      const sibling = direction === 'next' 
        ? currentElement.nextElementSibling 
        : currentElement.previousElementSibling;
  
      console.log("Sibling:", sibling);
      sibling?.scrollIntoView();
    }
  };
  