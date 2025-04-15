import { AnimatedButton } from '../../components/ui/animations';

<Link 
  to="/products" 
  className="btn btn-primary px-8 py-3 flex items-center"
>
  Shop Now <FiArrowRight className="ml-2" />
</Link>

<AnimatedButton
  className="btn btn-primary px-8 py-3 flex items-center"
  onClick={() => navigate('/products')}
>
  Shop Now <FiArrowRight className="ml-2" />
</AnimatedButton> 