export default function ScrollBar() {
   return <>
      <div className="red-bar  z-30"></div>
   
   <style jsx>{`
      @keyframes grow {
         from { transform: scaleX(0) }
         to {transform: scaleX(1)}
      }
      .red-bar {
         animation: grow auto linear;
         animation-timeline: scroll(root block);
      }
   `}</style>
   </>
}