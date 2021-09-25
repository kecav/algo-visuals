## ALGO VISUALS

![DEMO](./assets/demo.gif)


### Algorithms added

- Bubble Sort
- Selection Sort
- Insertion Sort

### Array generator

```
    // generates random valued array
    const generateRandom = (min, max, size) => {
        let randArr = [];
        for (let i = 0; i < size; i++) {
            const el = Math.floor(Math.random() * (max - min + 1) + min);
            randArr.push(el);
        }
        return randArr;
    }
```

*This repository is under progress*