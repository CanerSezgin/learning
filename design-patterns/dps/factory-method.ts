class Point {
    constructor(private x: number, private y: number) { }

    static newCartasianPoint(x: number, y: number) {
        return new Point(x, y)
    }

    static newPolarPoint(rho: number, theta: number) {
        return new Point(
            rho * Math.cos(theta),
            rho * Math.sin(theta)
        )
    }
}

const p1 = Point.newCartasianPoint(3, 4)
const p2 = Point.newPolarPoint(5, Math.PI / 2)

console.log({ p1, p2 })