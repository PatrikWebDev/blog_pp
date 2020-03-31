
                let archive = {
                    years: () =>{
                        let arr = []
                        results.forEach(element=>{
                            let resultDate = element.date.split("/")
                            arr.push(resultDate[2])
                        })
                         return arr.flat()
                    },
                    months: ()=>{
                        let arr = []
                        results.forEach(element=>{
                            let resultDate = element.date.split("/")
                            arr.push(resultDate[1])
                        })
                        let arr1= []
                        arr.for
                         return arr.flat()
                    },
                    title: ()=>{
                        let resultTitles = []
                        results.forEach(element=>{
                            resultTitles.push(element.title)
                        })
                        return resultTitles
                    },
                }

                console.log(archive.years())